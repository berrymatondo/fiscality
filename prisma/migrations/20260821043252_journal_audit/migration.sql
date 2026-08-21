CREATE TABLE "journal_audit" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "statutAvant" TEXT,
    "statutApres" TEXT,
    "userId" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "journal_audit_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "journal_audit_domain_recordId_idx" ON "journal_audit"("domain", "recordId");

ALTER TABLE "journal_audit" ADD CONSTRAINT "journal_audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
