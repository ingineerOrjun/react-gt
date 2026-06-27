import { BackLink } from '../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../components/admin/ui/ResourceForm';
import { productFields } from '../../../../components/admin/ui/specs';
import { saveProduct } from '../../../../lib/actions/products';
import { getCategoryOptions } from '../../../../lib/queries/admin';

export const metadata = { title: 'New product' };

export default async function NewProductPage() {
  const categories = await getCategoryOptions();
  return (
    <div>
      <BackLink href="/admin/products" label="Back to products" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">New product</h1>
      <ResourceForm
        fields={productFields}
        action={saveProduct}
        basePath="/admin/products"
        labelSingular="product"
        createLabel="Create product"
        draftKey="gt-draft-product-new"
        fieldOptions={{ category_id: categories }}
      />
    </div>
  );
}
