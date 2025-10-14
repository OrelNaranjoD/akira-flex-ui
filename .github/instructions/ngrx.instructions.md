## **applyTo: '/state//\*.ts'**

# **NgRx State Management Best Practices**

This document outlines the conventions and best practices for implementing NgRx
state management within the Akira Flex UI project. Following this guide ensures
a consistent, maintainable, and scalable state architecture.

## **Guiding Principles**

- **Single Source of Truth**: Global state must reside within the NgRx store.
- **Unidirectional Data Flow**: Follow the standard NgRx pattern (Component \-\>
  Action \-\> Effect \-\> Reducer \-\> Selector \-\> Component).
- **DRY (Don't Repeat Yourself)**: Avoid boilerplate by using modern NgRx APIs
  like createFeature and createActionGroup.
- **Separation of Concerns**: Each file has a single, clear responsibility.

## **File Structure for a New State "Slice"**

For any new feature state (e.g., products, orders), you must update the central
types file and create a dedicated folder for the logic.

libs/core/src/lib/state/ ├── state.types.ts \<-- 1\. ADD/UPDATE INTERFACE HERE
└── products/ ├── products.actions.ts ├── products.effects.ts ├──
products.feature.ts └── products.selectors.ts

## **1\. State Types (state.types.ts)**

This file is the single source of truth for the "shape" of the entire
application state.

- **Responsibility**: Define all state interfaces in one central location.
- **File Name**: state.types.ts.
- **Process**: When adding a new state slice, first define and export its
  interface from this file. It is also a good practice to update the root
  AppState interface.

### **Example (state.types.ts)**

/\*\* \* Defines the shape of the Authentication feature state. \*/ export
interface AuthState { user: User | null; token: string | null; loading: boolean;
error: string | null; initialized: boolean; }

/\*\* \* Defines the shape of the Products feature state. \*/ export interface
ProductsState { products: Product\[\]; loading: boolean; error: string | null; }

/\*\* \* Defines the root application state, combining all feature states. \*/
export interface AppState { auth: AuthState; products: ProductsState; // Add
other state slices here }

## **2\. Actions (\*.actions.ts)**

This file defines all possible events for the feature state.

- **Responsibility**: Define the "events" that can change the state.
- **File Name**: Use the format {feature-name}.actions.ts.
- **Implementation**:
  - **Must use createActionGroup**. Do not use individual createAction calls.
  - Use props\<{...}\>() for actions with a payload and emptyProps() for actions
    without one.

### **Example (products.actions.ts)**

import { createActionGroup, emptyProps, props } from '@ngrx/store'; import {
Product } from '../../shared';

export const ProductsActions \= createActionGroup({ source: 'Products', events:
{ 'Load Products': emptyProps(), 'Load Products Success': props\<{ products:
Product\[\] }\>(), 'Load Products Failure': props\<{ error: string }\>(), }, });

## **3\. Feature (\*.feature.ts)**

This is the core of the state slice, containing the reducer logic and the
initial state.

- **Responsibility**: Define how the state changes in response to actions.
- **File Name**: Use the format {feature-name}.feature.ts. **Do not name it
  .reducer.ts**.
- **Implementation**:
  - **Must use createFeature**.
  - **Import the state interface** from the central state.types.ts file.
  - **Define and export the initialState constant** within this file.
  - The reducer must be created with createReducer.
  - **Must group on handlers** for related actions to keep the code DRY.

### **Example (products.feature.ts)**

import { createFeature, createReducer, on } from '@ngrx/store'; import {
ProductsActions } from './products.actions'; import { ProductsState } from
'../state.types'; // \<-- Import from central types file

/\*\* \* The initial state for the Products feature. \*/ export const
initialProductsState: ProductsState \= { products: \[\], loading: false, error:
null, };

export const productsFeature \= createFeature({ name: 'products', reducer:
createReducer( initialProductsState, on(ProductsActions.loadProducts, (state)
\=\> ({ ...state, loading: true, error: null })),
on(ProductsActions.loadProductsSuccess, (state, { products }) \=\> ({ ...state,
products, loading: false })), on(ProductsActions.loadProductsFailure, (state, {
error }) \=\> ({ ...state, loading: false, error })), ), });

## **4\. Effects (\*.effects.ts)**

This file handles side effects, primarily API calls.

- **Responsibility**: Communicate with external services and dispatch new
  actions.
- **File Name**: Use the format {feature-name}.effects.ts.
- **Implementation**:
  - Use createEffect.
  - **Must use the appropriate RxJS flattening operator** (switchMap, concatMap,
    etc.). switchMap is preferred for most data-fetching operations.

### **Example (products.effects.ts)**

import { Injectable, inject } from '@angular/core'; import { Actions,
createEffect, ofType } from '@ngrx/effects'; import { catchError, map, of,
switchMap } from 'rxjs'; import { ProductsService } from
'../../services/products.service'; import { ProductsActions } from
'./products.actions';

@Injectable() export class ProductsEffects { private readonly actions$ \=
inject(Actions); private readonly productsService \= inject(ProductsService);

public readonly loadProducts$ \= createEffect(() \=\> this.actions$.pipe(
ofType(ProductsActions.loadProducts), switchMap(() \=\>
this.productsService.getAll().pipe( map((products) \=\>
ProductsActions.loadProductsSuccess({ products })), catchError((error) \=\>
of(ProductsActions.loadProductsFailure({ error: error.message }))), ), ), ), );
}

## **5\. Selectors (\*.selectors.ts)**

This file serves as the **public API for reading the state**.

- **Responsibility**: Provide a single, stable entry point for components to
  access state.
- **File Name**: Use the format {feature-name}.selectors.ts.
- **Implementation**:
  - **Must re-export all auto-generated selectors** from the \*.feature.ts file.
  - **Must create any composed or derived-state selectors** in this file using
    createSelector.

### **Example (products.selectors.ts)**

import { createSelector } from '@ngrx/store'; import { productsFeature } from
'./products.feature';

// 1\. Re-export auto-generated selectors export const selectProducts \=
productsFeature.selectProducts; export const selectLoading \=
productsFeature.selectLoading; export const selectError \=
productsFeature.selectError;

// 2\. Create composed selectors /\*\* \* Selects the total number of products.
\*/ export const selectTotalProducts \= createSelector( selectProducts,
(products) \=\> products.length );
