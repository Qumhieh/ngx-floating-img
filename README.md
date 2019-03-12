# NGX-FLOATING-IMG
Mobile look and feel image viewer for Angular 6+

Website: https://ngxfloatingimg.com

## Installation
Add ngx-floating-img to your Angular project
```
npm install --save ngx-floating-img
```

Once installed import NgxFloatingImgModule.forRoot() in your app.module.ts
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
NgxFloatingImgModule.forChild() for lazy loaded modules
```typescript
NgxFloatingImgModule.forChild()
```

Add ngx-floating-img in your template file
```html
<ngx-floating-img ... [options] ... >
    <img src="thumbImgSrc"></img>
</ngx-floating-img>
```

## Examples
https://ngxfloatingimg.com/examples

## Documentation
https://ngxfloatingimg.com/api

## Bugs
You can report any bugs as [Github issues](https://github.com/qumhieh/ngx-floating-img/issues)

##License
The project is licensed under the MIT license