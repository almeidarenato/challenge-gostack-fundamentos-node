import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (accumulator, current) => {
        if (current.type === 'income') accumulator.value += current.value;
        return accumulator;
      },
      { value: 0 },
    ).value;
    const outcome = this.transactions.reduce(
      (accumulator, current) => {
        if (current.type === 'outcome') accumulator.value += current.value;
        return accumulator;
      },
      { value: 0 },
    ).value;
    const total = this.transactions.reduce(
      (accumulator, current) => {
        if (current.type === 'income') accumulator.value += current.value;
        if (current.type === 'outcome') accumulator.value -= current.value;
        return accumulator;
      },
      { value: 0 },
    ).value;
    this.balance = { income, outcome, total };
    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
