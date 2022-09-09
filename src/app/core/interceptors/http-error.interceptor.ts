import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      if (!environment.production){
        console.log(err)
      }
      let errorMsg = '';

      if(err.error instanceof ErrorEvent) {
        errorMsg = `Erro: ${err.error.message}`
      } else if (Array.isArray(err.error) && err.error.length) {
        errorMsg = `Erro: ${err.error[0]}`
      } else if (err.error.errors){
        errorMsg = `Erro: ${err.error.errors}`
      } else {
        errorMsg = `Código do erro: ${err.status}. Mensagem: ${err.message}`
      }

      this.messageService.add(errorMsg)

      return throwError(() => new Error(errorMsg))
    } ));
  }
}
