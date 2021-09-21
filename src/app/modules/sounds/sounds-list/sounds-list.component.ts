import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryEntity } from 'src/app/core/entities/category.entity';
import { CategoryService } from 'src/app/core/services/category.service';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundEntity } from 'src/app/core/entities/sound.entity';
import { SearchBarComponent } from 'src/app/base/components/search-bar/search-bar.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sounds-list',
  templateUrl: './sounds-list.component.html',
  styleUrls: ['./sounds-list.component.scss'],
})
export class SoundsListComponent implements OnInit {
  @ViewChild('search', { static: false }) search: SearchBarComponent;
  categories: CategoryEntity[];
  isFilterShowing: boolean = false;

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

  ngOnInit(): void {
    this.categoryService
      .fetchAll()
      .pipe(take(1))
      .subscribe(
        (categories) => (this.categories = categories as CategoryEntity[])
      );
  }

  onSelectSound(sound: SoundEntity) {
    this.router.navigateByUrl('/sounds/' + sound.id, { state: { ...sound } });
  }

  onShowFilter() {
    this.isFilterShowing = !this.isFilterShowing;
  }
}
