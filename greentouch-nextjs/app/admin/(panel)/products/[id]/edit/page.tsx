import { notFound } from 'next/navigation';
import { BackLink } from '../../../../../components/admin/ui/PageHeader';
import ResourceForm from '../../../../../components/admin/ui/ResourceForm';
import { productFields } from '../../../../../components/admin/ui/specs';
import { saveProduct, deleteProduct, duplicateProduct } from '../../../../../lib/actions/products';
import { getAdminProduct, getCategoryOptions } from '../../../../../lib/queries/admin';

export const metadata = { title: 'Edit product' };

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([getAdminProduct(params.id), getCategoryOptions()]);
  if (!product) notFound();

  return (
    <div>
      <BackLink href="/admin/products" label="Back to products" />
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Edit product</h1>
      <ResourceForm
        fields={productFields}
        action={saveProduct}
        record={product as unknown as Record<string, unknown>}
        basePath="/admin/products"
        labelSingular="product"
        createLabel="Create product"
        previewHref={product.published ? `/products/${product.slug}` : undefined}
        onDelete={deleteProduct}
        onDuplicate={duplicateProduct}
        draftKey={`gt-draft-product-${product.id}`}
        fieldOptions={{ category_id: categories }}
      />
    </div>
  );
}
