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
import { ChatCompletionRequestMessage } from "openai";
import { ApiService } from "src/app/services/api.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { HttpResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { json } from "express";

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
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  @ViewChild("window") window!: any;
  @ViewChild("container", { static: false }) containerRef: ElementRef;
  public messages: ChatCompletionRequestMessage[] = [];
  selectedDataset: Array<object> = [];
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

  }
  onSelectedDatabaseInfoChange(databaseInfo: Array<object>): void {
    this.selectedDataset = databaseInfo;
    console.log('selectedDataset: ', this.selectedDataset)
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

  enableDownload(event: MouseEvent){
    const target = event.target as HTMLElement;
    console.log('Link clicked!');

    // Check if the clicked element is an 'a' tag
    if (target.tagName.toLowerCase() === 'a') {
      event.preventDefault(); // Prevent default if it's a link
      // Perform your action here
      console.log('Link clicked!');
      const file_info = target.className.split(' ')
      const id = file_info[0];
      const name = file_info[1];
      this.downloadFile(id, name)
      // You can also check for specific attributes, IDs, etc.
    }
  }

  async downloadFile(id: string, filename: string|null) {
    // event.preventDefault(); // Prevent default action of the link
   
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
        selectedDataset : JSON.stringify(this.selectedDataset),
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
          // this.chatService.setMessagesSubject(this.messages);

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
    // const links = document.querySelectorAll("a");
    // links.forEach((link) => {
    //   link.addEventListener("click", this.downloadFile.bind(this));
    // });
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
