<script lang="ts">
  import { writable } from 'svelte/store';

  interface Expense {
    id: number;
    description: string;
    amount: number;
  }

  const expenses = writable<Expense[]>([]);
  let newExpense = { description: '', amount: 0 };

  function addExpense() {
    if (newExpense.description && newExpense.amount > 0) {
      expenses.update(currentExpenses => [
        ...currentExpenses,
        { id: Date.now(), ...newExpense }
      ]);
      newExpense = { description: '', amount: 0 };
    }
  }
</script>

<div class="flex flex-col items-center">
  <h1 class="text-3xl font-bold mb-4">Expense Tracker</h1>

  <div class="form-control w-full max-w-xs mb-4">
    <label class="label" for="description">
      <span class="label-text">Description</span>
    </label>
    <input type="text" id="description" bind:value={newExpense.description} class="input input-bordered w-full max-w-xs" />
  </div>

  <div class="form-control w-full max-w-xs mb-4">
    <label class="label" for="amount">
      <span class="label-text">Amount</span>
    </label>
    <input type="number" id="amount" bind:value={newExpense.amount} class="input input-bordered w-full max-w-xs" />
  </div>

  <button class="btn btn-primary mb-4" on:click={addExpense}>Add Expense</button>

  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each $expenses as expense}
          <tr>
            <td>{expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>