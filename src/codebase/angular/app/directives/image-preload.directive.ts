import { Directive, Input, HostBinding, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'img[default]'
})
export class ImagePreloadDirective implements OnChanges {
  @Input() default: string;
  @Input() src: string;
  @HostBinding('src') url;
  @HostListener('error') updateUrl() {
    this.url = this.default;
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges({ src }: SimpleChanges): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(src.currentValue);
  }
}