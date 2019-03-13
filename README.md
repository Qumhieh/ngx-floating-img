# NGX-FLOATING-IMG
Mobile look and feel image viewer for Angular 6+

Website: https://qumhieh.github.io/ngx-floating-img/

## Table of contents
- [Installation](#installation)
- [Options](#options)
- [Default options](#default-options)
- [Events](#events)
- [Examples](#examples)
- [Bugs](#bugs)
- [License](#license)

## Installation
Add ngx-floating-img to your Angular project
```
npm install --save ngx-floating-img
```

Once installed import ***NgxFloatingImgModule.forRoot()*** in your app.module.ts
```typescript
import { NgxFloatingImgModule } from "ngx-floating-img";

...
@NgModule({
   ...
   imports: [
    ...
    NgxFloatingImgModule.forRoot(),
    ...
   ],
   ...
})
export class AppModule {}
```
***NgxFloatingImgModule.forChild()*** for lazy loaded modules
```typescript
NgxFloatingImgModule.forChild()
```

Add ngx-floating-img in your template file
```html
<ngx-floating-img ... [options] ... >
    <img src="thumbImgSrc" />
</ngx-floating-img>
```

## Options
| Option | Description | Type | Default |
| --- | --- | --- | --- |
| id | Component id, can be used as a return value in events handling  | string | - |
| imgSrc | Full image src  | string | - |
| imgWidth ( Required ) | Full image width in pixels, if full image not provided then thumb image width  | number | - |
| imgHeight ( Required ) | Full image height in pixels, if full image not provided then thumb image height  | number | - |
| imgAnimationType | Image animation type on show and hide | any valid css animation (linear, ease-in ...) | ease-out |
| imgAnimationSpeed | Image animation speed on show and hide | any number between 0 (for no animation) and 800 | 250 |
| vpPadding | Viewport padding in pixels when full image is visible | number | 20 |
| overlayColor | Image overlay background color  | color | transparent |
| overlayAnimation | Enable / disable fade animation for image overlay | boolean | true |
| overlayDismiss | Enable / disable close image on overlay click | boolean | true |
| thumbBgColor | Thumb background color | color | #f0f0f0 |
| showLoading | Enable / disable loading bar | boolean | true |
| loadingColor | Change loading bar background color | color | transparent |
| showCloseButton | Show / hide close button | boolean | true |

## Default options
Default options can be changed by adding a new object of type **NGXFloatingImgOptions** when importing **NgxFloatingImgModule** in your module
```typescript
NgxFloatingImgModule.forRoot({ imgAnimationSpeed: 200, vpPadding: 30, imgAnimationType: 'linear' })
```
***NGXFloatingImgOptions default values***
```
{
    showLoading: true
    loadingColor: transparent
    imgAnimationType: 'ease-out'
    imgAnimationSpeed: 250
    overlayColor: 'transparent'
    overlayAnimation: true
    overlayDismiss: true
    thumbBgColor: '#f0f0f0'
    vpPadding: 20
    showCloseButton: true
}
```

## Events
| Event | Description | Return |
| --- | --- | --- |
| beforeShow | This event fires right after thumb click and before animation starts | component id |
| afterShow | This event fires after show animation is fully completed | component id |
| onFullImgLoad | This event fires after full image is fully loaded (if imgSrc attribute provided) | component id |
| beforeClose | This event fires right before close full image process starts | component id |
| afterClose | This event fires after closing animation completed | component id |

## Examples
https://qumhieh.github.io/ngx-floating-img/examples

## Bugs
You can report any bugs as [Github issues](https://github.com/qumhieh/ngx-floating-img/issues)

## License
The project is licensed under the MIT license