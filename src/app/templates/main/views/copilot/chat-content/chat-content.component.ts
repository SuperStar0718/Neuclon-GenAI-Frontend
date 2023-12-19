import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef ,
} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MarkdownService } from 'ngx-markdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiKeyService } from 'src/app/services/api-key.service';
import { ChatCompletionRequestMessage } from 'openai';
import { ApiService } from 'src/app/services/api.service';
import { json } from 'express';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css'],
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

  @ViewChild('window') window!: any;
  public messages: ChatCompletionRequestMessage[] = [];
  apiKey: string | null = '';
  isBusy: boolean = false;
  currChatSelected: string = '';
  @ViewChild('textInput', { static: true }) textInputRef!: ElementRef;

  ngOnInit(): void {
    this.scrollToBottom();

    // Subscribe to messages
    this.chatService.getMessagesSubject().subscribe((messages) => {
      this.messages = messages;
    });

    // Subscribe to the api key.
    this.apiKeyService.getApiKey().subscribe((apiKey) => {
      this.apiKey = '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';
    });
  }

  ngAfterViewInit() {
    this.textInputRef.nativeElement.focus();
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

  async createCompletion(element: HTMLTextAreaElement) {
    let prompt = element.value;
    prompt = "<pre class='whitespace-pre-wrap'>" + prompt + "</pre>";
    console.log('prompt: ', prompt)
    if (prompt.length <= 1 || this.isBusy) {
      element.value = '';
      return;
    }
    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: prompt,
    };
    this.isBusy = true;

    this.messages.push(message);
    console.log("messages: ", this.messages)
    console.log('is busy:', this.isBusy);
    try {
        
        const responseMessage: ChatCompletionRequestMessage = {
          role: 'assistant',
          content: '',
        };
        this.messages.push(responseMessage);
        const req = {
          prompt: element.value,
          new: this.messages.length > 2 ? false : true,
        }
        this.apiService.generateResponseFromChatGPT(req).subscribe((response:any)=>{
          console.log('response from chat gpt: ', response);
          if(response)
            responseMessage.content += response;
           // Manually trigger change detection
          this.cdr.detectChanges();
          
          this.scrollToBottom();
          this.isBusy = false;
          this.chatService.setMessagesSubject(this.messages);
          console.log("messages: ", this.messages);
        });
      // });
    } catch (err) {
      this.snackBar.open(
        'API Request Failed, please check after some time or verify the OpenAI key.',
        'Close',
        {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );
    }
    element.value = '';

  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}