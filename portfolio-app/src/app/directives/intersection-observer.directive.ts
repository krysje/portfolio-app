import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]'
})

export class IntersectionObserverDirective {
 private observer!: IntersectionObserver;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'show');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'show');
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
