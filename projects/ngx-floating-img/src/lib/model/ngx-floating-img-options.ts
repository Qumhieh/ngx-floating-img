import { NGXFloatingImgPlatforms } from "./enums";

export interface NGXFloatingImgOptions {
    platform?: NGXFloatingImgPlatforms,
    // default options
    showLoading?: boolean,
    imgAnimationType?: string,
    imgAnimationSpeed?: number,
    overlayColor?: string,
    overlayAnimation?: boolean,
    overlayDismiss?: boolean,
    thumbBgColor?: string,
    vpPadding?: number,
    showCloseButton?: boolean
}