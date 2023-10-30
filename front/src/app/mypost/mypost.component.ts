import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css'],
})
export class MypostComponent implements AfterViewInit, OnInit {
  private apiUrl = 'http://localhost:3000';
  selectedDate: Date = new Date();
  textFilter: string = '';
  messages: any[] = [];
  filteredMessages: any[] = [];
  totalMessages: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';
  showingPostsMessage: string = 'Paginator not initialized';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.updateShowingPostsMessage();
    }
  }

  getMessages(selectedDate: Date) {
    if (!this.paginator) {
      setTimeout(() => this.getMessages(selectedDate), 100);
      return;
    }

    let userId = JSON.parse(localStorage.getItem('user') || '{}');
    userId = userId.id;

    // Format the selectedDate as "DD/MM/YY"
    const formattedDate = this.formatDate(selectedDate);

    this.http
      .get<any[]>(
        `${this.apiUrl}/api/my-post/?userId=${userId}&selectedDate=${formattedDate}`
      )
      .subscribe(
        (data) => {
          this.messages = data;
          this.totalMessages = this.messages.length;
          this.applyFilter();
          this.errorMessage = ''; // Reset the error message
          this.updateShowingPostsMessage(); // Update totalMessages and showingPostsMessage here
          this.changeDetectorRef.detectChanges(); // Manually trigger change detection
          this.changeDetectorRef.reattach(); // Reattach change detection
        },
        (error) => {
          this.errorMessage = 'Error fetching messages: ' + error.error.message;
          this.changeDetectorRef.detectChanges(); // Manually trigger change detection
          this.changeDetectorRef.reattach(); // Reattach change detection
        }
      );
  }

  updateShowingPostsMessage() {
    const startIndex = this.paginator.pageIndex * this.pageSize + 1;
    const endIndex = Math.min(
      startIndex + this.pageSize - 1,
      this.totalMessages
    );

    if (this.totalMessages === 0) {
      this.showingPostsMessage = 'No Posts to Show';
    } else {
      this.showingPostsMessage = `Showing ${startIndex}/${endIndex} Posts`;
    }

    // Manually trigger change detection
    this.changeDetectorRef.detectChanges();
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    return `${day}/${month}/${year}`;
  }

  applyFilter() {
    this.filteredMessages = this.messages.filter((message) => {
      const messageDate = new Date(message.datetime);
      const selectedDate = this.selectedDate;

      return (
        messageDate.getDate() === selectedDate.getDate() &&
        messageDate.getMonth() === selectedDate.getMonth() &&
        messageDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    this.errorMessage = '';
    this.totalMessages = this.filteredMessages.length;
  }

  onDateChange() {
    this.getMessages(this.selectedDate);
  }

  onPageChange(event: MatPaginator) {
    if (this.paginator) {
      this.paginator.pageIndex = event.pageIndex;
      this.applyFilter();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit() {
    if (!this.paginator) {
      setTimeout(() => this.getMessages(this.selectedDate), 100);
      return;
    }

    this.getMessages(this.selectedDate);
  }
}
