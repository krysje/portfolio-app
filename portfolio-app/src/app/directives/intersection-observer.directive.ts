import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective {
  private observer!: IntersectionObserver;
  @Input('appIntersectionObserver') transitionClass = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.transitionClass.trim() !== '') {
            const transitionClasses = this.transitionClass.split(' ');
            transitionClasses.forEach((className) => {
              this.renderer.addClass(this.el.nativeElement, className);
            });
          }
          this.renderer.addClass(this.el.nativeElement, 'show');
        } else {
          if (this.transitionClass.trim() !== '') {
            const transitionClasses = this.transitionClass.split(' ');
            transitionClasses.forEach((className) => {
              this.renderer.removeClass(this.el.nativeElement, className);
            });
          }
          this.renderer.removeClass(this.el.nativeElement, 'show');
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }
}
