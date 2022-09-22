import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[uppercase]',
  host: {
    '(input)': '$event'
  }
})
export class UpperCaseTextDirective {

  lastValue: any;

  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput($event:any) 
  {
    let event:any;
    var start:any = $event.target.selectionStart;
    var end:any = $event.target.selectionEnd;
    $event.target.value = $event.target.value.toUpperCase();
    $event.target.setSelectionRange(start, end);
    $event.preventDefault();

    if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
      this.lastValue = this.ref.nativeElement.value = $event.target.value;
      // Propagation
      const evt:any = document.createEvent('HTMLEvents');
      evt.initEvent('input', false, true);
      event?.target.dispatchEvent(evt);
    }
  }
}
