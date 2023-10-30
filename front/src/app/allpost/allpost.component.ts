import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.css'],
})
export class AllpostComponent implements OnInit {
  private apiUrl = 'http://localhost:3000';
  selectedDate: Date = new Date();
  textFilter: string = '';
  messages: any[] = [];
  filteredMessages: any[] = [];
  totalMessages: number = 0;
  pageSize: number = 2;
  errorMessage: string = '';
  showingPostsMessage: string = 'Paginator not initialized';
  keywordFilter: string = '';

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
  getMessages(selectedDate: Date, keyword: string) {
    if (!this.paginator) {
      setTimeout(() => this.getMessages(selectedDate, keyword), 0); // Cambio aquí
      return;
    }

    // Format the selectedDate as "DD/MM/YY"
    const formattedDate = this.formatDate(selectedDate);

    this.http
      .get<any[]>(
        `${this.apiUrl}/api/my-post/search?selectedDate=${formattedDate}&keyword=${keyword}`
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
      this.filteredMessages.length // Usar filteredMessages en lugar de messages
    );

    if (this.filteredMessages.length === 0) {
      // Usar filteredMessages en lugar de messages
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

      // Filtrar por fecha
      const dateFilter =
        messageDate.getDate() === selectedDate.getDate() &&
        messageDate.getMonth() === selectedDate.getMonth() &&
        messageDate.getFullYear() === selectedDate.getFullYear();

      // Filtrar por palabra clave solo si se ha ingresado algo en el campo de filtro
      const keywordFilter =
        this.keywordFilter.trim() === '' ||
        message.postTitle
          .toLowerCase()
          .includes(this.keywordFilter.toLowerCase());

      return dateFilter && keywordFilter;
    });

    this.errorMessage = '';
    this.totalMessages = this.filteredMessages.length; // Actualizar el contador

    this.updateShowingPostsMessage();
    // Actualizar la vista
    this.changeDetectorRef.detectChanges();
  }

  onDateChange() {
    this.getMessages(this.selectedDate, '');
  }

  onPageChange(event: PageEvent) {
    if (this.paginator) {
      this.paginator.pageIndex = event.pageIndex;
      this.applyFilter();
      this.updateShowingPostsMessage();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit() {
    if (!this.paginator) {
      setTimeout(() => {
        this.getMessages(this.selectedDate, '');
        this.applyFilter();
      }, 100);
      return;
    }

    this.getMessages(this.selectedDate, '');
    this.applyFilter();
  }
}
