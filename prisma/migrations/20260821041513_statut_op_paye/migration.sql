-- Extend the workflow beyond publication with a payment-order stage (DGF -> BCC).
ALTER TYPE "StatutSaisie" ADD VALUE 'OP_SOUMIS';
ALTER TYPE "StatutSaisie" ADD VALUE 'PAYE';
