import { Component, ComponentRef, inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IServiceCRUD } from '../../interfaces/IServiceCRUD';
import { SERVICE_CRUD_TOKEN } from '../../providers/providers';
import { Router } from '@angular/router';
import { extractErrors } from '../../extractErrors';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";

@Component({
  selector: 'app-edit-entity',
  standalone: true,
  imports: [ShowErrorsComponent],
  templateUrl: './edit-entity.component.html',
  styleUrl: './edit-entity.component.css'
})
export class EditEntityComponent<TDTO, TCreateDTO> implements OnInit {

  ngOnInit(): void {
    this.serviceCRUD.getById(this.id).subscribe(entity => {
      this.loadComponent(entity);
    })
  }

  loadComponent(entity: any){
    if (this.containerForm){
      this.componentRef = this.containerForm.createComponent(this.form);
      this.componentRef.instance.model = entity;
      this.componentRef.instance.postForm.subscribe((entity: any) => {
        this.saveChages(entity);
      })

      this.load = false;
    }
  }


  @Input()
  id!: number;

  @Input({required: true})
  title!: string;

  @Input({required: true})
  indexRoute!: string;

  @Input({required: true})
  form: any;

  errors: string[] = [];

  serviceCRUD = inject(SERVICE_CRUD_TOKEN) as IServiceCRUD<TDTO, TCreateDTO>;
  private router = inject(Router);
  load = true;

  @ViewChild('containerForm', {read: ViewContainerRef})
  containerForm!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  saveChages(entity: TCreateDTO) {
    this.serviceCRUD.update(this.id, entity).subscribe({
      next: () => {
        this.router.navigate([this.indexRoute]);
      },
      error: err => {
        const errors = extractErrors(err);
        this.errors = errors;
      }
    });
  }
}
