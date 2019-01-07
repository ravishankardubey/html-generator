import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HtmlGeneratorComponent } from './html-generator/html-generator.component';
import { LovsCheckComponent } from './lovs-check/lovs-check.component';

const routes: Routes = [
  { path: '', component: HtmlGeneratorComponent },
  { path: 'lovs-check', component: LovsCheckComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ]
})

export class AppRoutingModule { }
