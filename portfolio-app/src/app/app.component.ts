import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  title = 'portfolio-app';
  loader = false;
  greetingsList: string[] = ['olá', 'Guten Tag', 'Bonjour', 'こんにちは', '您好', '안녕하세요', 'Ciao', 'स्वागत है'];
  currentIndex = 0;
  greeting = 'Hello';
  isNavbarVisible = true;
  isMenuBarVisible = false;

  scrollYPosition: number = 0;

  @ViewChild('navbarContent', { static: false })
  navbarContent!: ElementRef;

  @ViewChild('content') contentElement!: ElementRef;

  constructor(private renderer: Renderer2, 
    private elementRef: ElementRef) {}

  async ngOnInit() {
    AOS.init();
    await this.delay(1000);
    setInterval(() => this.displayGreetingsWithDelay(), 400);
    setTimeout(() => this.loader = false, 4000);
  }

  ngAfterViewInit() {
    this.renderer.listen(this.contentElement.nativeElement, 'scroll', (event) => {
      this.scrollYPosition = event.target.scrollTop;
      this.isNavbarVisible = this.scrollYPosition > 100 ? false : true;
      this.isMenuBarVisible = this.scrollYPosition > 500 ? true : false;
    });
  }


  toggleNavbar() {
    const contentElement = this.navbarContent.nativeElement;
    if (contentElement.classList.contains('show')) {
      this.renderer.removeClass(contentElement, 'show');
    } else {
      this.renderer.addClass(contentElement, 'show');
    }
  }

 

  delay(ms: number) {
    return new Promise<void>(resolve => {
      setTimeout(resolve, ms);
    });
  }

  displayGreetingsWithDelay() {
    if (this.currentIndex < this.greetingsList.length) {
      this.greeting = this.greetingsList[this.currentIndex];
      this.currentIndex++;
    }
  }

  toIntro(){
    document.getElementById("intro")?.scrollIntoView({behavior:'smooth'});
    this.closeSideMenu();
  }
  toResume(){
    document.getElementById("resume")?.scrollIntoView({behavior:'smooth'});
    this.closeSideMenu();
  }
  toContact(){
    document.getElementById("contact")?.scrollIntoView({behavior:'smooth'});
    this.closeSideMenu();
  }
  openInNewTab(){
      window.open('assets/downloads/Aman_Bansiwal_Resume_082023.pdf', '_blank');
      this.closeSideMenu();
  }

  showSideMenu(){
    document.getElementById('side-menu')?.classList.toggle("active");
    this.isMenuBarVisible = this.scrollYPosition > 500 ? true : false;
  }

  showSideIconAndMenu(){
    this.isMenuBarVisible = true;
    this.showSideMenu();
  }

  closeSideMenu(){
    document.getElementById('side-menu')?.classList.toggle("active");
  }
}
