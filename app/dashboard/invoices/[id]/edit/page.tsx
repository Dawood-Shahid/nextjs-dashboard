import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';

export default async function Page(params: {
  params: Promise<{ id: string }>;
}) {
  const routeParams = await params.params;
  const invoiceId = routeParams.id;

  //   const customers = await fetchCustomers();
  //   const invoice = await fetchInvoiceById(invoiceId);

  const [customers, invoice] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(invoiceId),
  ]);

  return (
    <div className='w-full flex flex-col h-full py-6 md:py-12 px-6 md:px-12'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${invoiceId}/edit`,
            active: true,
          },
        ]}
      />
      <Form customers={customers} invoice={invoice} />
    </div>
  );
}
