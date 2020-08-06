import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance().total;
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    if (transaction.type === 'outcome')
      if (transaction.value > balance)
        throw Error('Outcome value cant be higher than balance');
    return transaction;
  }
}

export default CreateTransactionService;
