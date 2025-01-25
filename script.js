const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const addExpenseButton = document.getElementById("add-expense");
const expensesList = document.getElementById("expenses");
const totalDisplay = document.getElementById("total");
const filterCategory = document.getElementById("filter-category");

let expenses = [];

function addExpense() {
  const name = expenseName.value;
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details.");
    return;
  }

  const expense = { name, amount, category };
  expenses.push(expense);

  updateExpenseList();
  updateTotal();

  expenseName.value = "";
  expenseAmount.value = "";
}

function updateExpenseList() {
  const selectedCategory = filterCategory.value;

  expensesList.innerHTML = "";

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  filteredExpenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} (${expense.category}): €${expense.amount.toFixed(2)}
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expensesList.appendChild(li);
  });
}

function updateTotal() {
  const selectedCategory = filterCategory.value;

  const filteredExpenses = selectedCategory === "All"
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateTotal();
}

addExpenseButton.addEventListener("click", addExpense);

filterCategory.addEventListener("change", () => {
  updateExpenseList();
  updateTotal();
});