import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { MarkdownService } from "ngx-markdown";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiKeyService } from "src/app/services/api-key.service";
import { ChatCompletionRequestMessage } from "openai";
import { ApiService } from "src/app/services/api.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: "app-chat-content",
  templateUrl: "./chat-content.component.html",
  styleUrls: ["./chat-content.component.scss"],
})
export class ChatContentComponent
  implements OnInit, AfterViewChecked, AfterViewInit
{
  constructor(
    private chatService: ChatService,
    private markdownService: MarkdownService,
    private apiKeyService: ApiKeyService,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  @ViewChild("window") window!: any;
  @ViewChild("container", { static: false }) containerRef: ElementRef;
  public messages: ChatCompletionRequestMessage[] = [];
  apiKey: string | null = "";
  isBusy: boolean = false;
  currChatSelected: string = "";
  @ViewChild("textInput", { static: true }) textInputRef!: ElementRef;
  ngOnInit(): void {
    this.scrollToBottom();

    // Subscribe to messages
    this.chatService.getMessagesSubject().subscribe((messages) => {
      this.messages = messages;
    });

    // Subscribe to the api key.
    this.apiKeyService.getApiKey().subscribe((apiKey) => {
      this.apiKey = "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";
    });
  }
  onSelectedDatabaseInfoChange(databaseInfo: any): void {
    console.log("databaseInfo", databaseInfo);
  }

  ngAfterViewInit() {
    this.textInputRef.nativeElement.focus();
    this.containerRef.nativeElement.addEventListener(
      "click",
      this.downloadFile
    );
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  async askExamQuestion(event: MouseEvent) {
    const target = event.target as HTMLElement;
    //create HTMLTextAreaElement with the target
    this.textInputRef.nativeElement.value = target.innerText;

    await this.createCompletion(this.textInputRef.nativeElement);
    console.log(target.innerText);
  }

  getSanitizedHtml(content: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  async downloadFile(event: Event) {
    console.log("download file");
    // event.preventDefault(); // Prevent default action of the link
    const target = event.target as HTMLAnchorElement;
    const id = target.id;
    const filename = target.getAttribute("name");
    console.log("filename: ", filename);
    console.log("download file:", id);

    this.apiService.downloadFile(id).subscribe((response: any) => {
      console.log("response: ", response);

      // Access the response body as a Blob
      const blob = response.body;

      // Create a temporary URL for the Blob object
      const url = blob ? URL.createObjectURL(blob) : null;

      // Create a link element
      const link = document.createElement("a");
      link.href = url || "";
      link.download = filename || "";

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url ? url : "");
    });
  }

  async createCompletion(element: HTMLTextAreaElement) {
    let prompt = element.value;
    prompt = "<pre class='whitespace-pre-wrap'>" + prompt + "</pre>";
    console.log("prompt: ", prompt);
    if (prompt.length <= 1 || this.isBusy) {
      element.value = "";
      return;
    }
    const message: ChatCompletionRequestMessage = {
      role: "user",
      content: prompt,
    };
    this.isBusy = true;

    this.messages.push(message);
    console.log("messages: ", this.messages);
    console.log("is busy:", this.isBusy);
    try {
      const responseMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: "",
      };
      this.messages.push(responseMessage);
      const req = {
        prompt: element.value,
        new: this.messages.length > 2 ? false : true,
      };
      this.apiService
        .generateResponseFromChatGPT(req)
        .subscribe((response: any) => {
          console.log("response from chat gpt: ", response);
          if (response) responseMessage.content += response;
          // Manually trigger change detection
          this.cdr.detectChanges();

          this.scrollToBottom();
          this.isBusy = false;
          this.chatService.setMessagesSubject(this.messages);
          console.log("messages: ", this.messages);
        }, (error:any)=>{
            console.error('An error occurred:', error);
            this.snackBar.open(
                "API Request Failed, please check after some time.",
                "Close",
                {
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  duration: 5000,
                }
              );
          this.messages.pop();
          this.isBusy = false;


        });
      // });
    } catch (err) {
      console.log("err from chatgpt:", err);
      this.snackBar.open(
        "API Request Failed, please check after some time or verify the OpenAI key.",
        "Close",
        {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 5000,
        }
      );
    }
    element.value = "";
    console.log("set eventlistner");
    // Add event listener after a brief delay to ensure DOM is updated
    const links = document.querySelectorAll("pre a");
    links.forEach((link) => {
      link.addEventListener("click", this.downloadFile.bind(this));
    });
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
