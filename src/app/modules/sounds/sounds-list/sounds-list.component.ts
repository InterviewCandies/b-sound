import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryEntity } from 'src/app/core/entities/category.entity';
import { CategoryService } from 'src/app/core/services/category.service';
import { take, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundEntity } from 'src/app/core/entities/sound.entity';
import { SearchBarComponent } from 'src/app/base/components/search-bar/search-bar.component';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import utils from 'src/app/utils';

@Component({
  selector: 'app-sounds-list',
  templateUrl: './sounds-list.component.html',
  styleUrls: ['./sounds-list.component.scss'],
})
export class SoundsListComponent implements OnInit, OnDestroy {
  @ViewChild('search', { static: false }) search: SearchBarComponent;
  categories: CategoryEntity[] = [];
  isFilterShowing: boolean = false;
  unsubsciber$ = new Subject();
  isLoading: boolean = false;

  toppings = new FormControl();

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  displayCategoryName(name: string) {
    return utils.getFriendlyName(name);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService
      .fetchAll()
      .pipe(takeUntil(this.unsubsciber$))
      .subscribe((categories) => {
        this.categories = categories;
        this.isLoading = false;
      });
  }

  onSelectSound(sound: SoundEntity) {
    this.router.navigateByUrl('/sounds/' + sound._id, { state: { ...sound } });
  }

  onShowFilter() {
    this.isFilterShowing = !this.isFilterShowing;
  }

  ngOnDestroy() {
    this.unsubsciber$.next();
    this.unsubsciber$.complete();
  }
}