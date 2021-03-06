import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbChatModule,
  NbSpinnerModule,
  NbDialogModule,
  NbDatepickerModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbDateFnsDateModule } from "@nebular/date-fns";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { LoginComponent } from "./account/login.component";
import { AppRouteGuard } from "./account/auth/auth-route-guard";

import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";
import { DialogDatePromptComponent } from "./dialog/dialog-date-prompt.component";
import { FormsModule } from "@angular/forms";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: ["public_profile", "email", "user_likes", "user_friends"],
      customParameters: {
        auth_type: "reauthenticate",
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    },
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: "<your-tos-link>",
  privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
};

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    LoginComponent,
    DialogDatePromptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
    NbSpinnerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NbDialogModule.forRoot({
      autoFocus: false,
      hasScroll: false,
      closeOnEsc: false,
      closeOnBackdropClick: false,
    }),
    NbDatepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({
      format: "dd-MM-yyyy",
    }),
  ],
  providers: [AppRouteGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
