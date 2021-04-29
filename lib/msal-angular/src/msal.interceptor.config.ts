/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { HttpRequest } from "@angular/common/http";
import { PopupRequest, RedirectRequest, InteractionType, SilentRequest } from "@azure/msal-browser";
import { MsalService } from "./msal.service";

export declare type MsalInterceptorAuthRequest = Omit<PopupRequest, "scopes"> | Omit<RedirectRequest, "scopes"> | Omit<SilentRequest, "scopes"> ;

export type MsalInterceptorConfiguration = {
    interactionType: InteractionType.Popup | InteractionType.Redirect;
    protectedResourceMap: Map<string, Array<string|HttpMethodScopes> | null>;
    authRequest?: MsalInterceptorAuthRequest | ((msalService: MsalService, req: HttpRequest<unknown>, originalAuthRequest: MsalInterceptorAuthRequest) => MsalInterceptorAuthRequest);
};

export type HttpMethodScopes = {
    method: string,
    scopes: Array<string>
};
