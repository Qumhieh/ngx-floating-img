import { InjectionToken } from "@angular/core";

import { NGXFloatingImgOptions } from "./model/ngx-floating-img-options";
import { NGXFloatingImgPlatforms } from "./model/enums";

export const NGX_FI_WINDOW = new InjectionToken<Window>(
    'WindowToken',
    typeof window !== 'undefined' && window.document ? { factory: () => window } : undefined
);

export const NGX_FLOATING_IMG_OPTIONS_TOKEN = new InjectionToken<NGXFloatingImgOptions>('ngxfloatingimg default options');

export const NGX_FLOATING_IMG_DEFAULT_OPTIONS: NGXFloatingImgOptions = {
    platform: NGXFloatingImgPlatforms.BROWSER,
    showLoading: true,
    imgAnimationType: 'ease-out',
    imgAnimationSpeed: 250,
    overlayColor: 'transparent',
    overlayAnimation: false,
    overlayDismiss: true,
    thumbBgColor: '#f0f0f0',
    vpPadding: 20,
    showCloseButton: true
}