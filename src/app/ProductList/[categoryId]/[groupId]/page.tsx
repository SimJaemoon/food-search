import CategoryDetailCarousel from '@/components/molecules/CategoryDetailCarousel';
import ProductListContainer from '@/components/containers/ProductListContainer';
import {
  fetchProductCategoryGroups,
  fetchProductCategorySingles,
  fetchProduct,
} from '@/lib/data/action';

// TODO: 검색어 접근 반영하기 : category_name 목록 표시(group_name, single_name이 아닌) (nav 가 2줄 => 1줄로 변경 : UI memo 참고)
export default async function ProductList({
  params,
}: {
  params: {
    categoryId: string;
    groupId: string;
  };
}) {
  // TODO: 접근 불가능한 url param 값 처리 - error page
  const categoryId = params.categoryId;
  const groupId = params.groupId;

  // HOLD: categoryId, groupId가 DB상 존재하지 않는 경우, 불필요한 데이터 통신 방지하려면 category 관련 데이터를 hard-code로 주입하는게 나을 듯
  const productCategoryGroups = await fetchProductCategoryGroups(categoryId);
  const productCategorySingles = await fetchProductCategorySingles(groupId);
  const products = await fetchProduct(groupId);

  return (
    <>
      <nav className="h-[80px] w-full">
        {/* 세부 카테고리 - 그룹 */}
        <div className="h-8 w-full">
          <CategoryDetailCarousel
            categoryId={categoryId}
            groupId={groupId}
            type="categoryDetailGroup"
            groupData={productCategoryGroups}
          />
        </div>
        {/* 세부 카테고리 - 단일 */}
        <div className="h-12 w-full">
          <CategoryDetailCarousel
            categoryId={categoryId}
            groupId={groupId}
            type="categoryDetailSingle"
            singleData={productCategorySingles}
          />
        </div>
      </nav>
      {/* TODO: 검색어를 통한 page 진입시 nav 가 1줄로 바뀜으로 인한 main tag height의 176px 에 변화 발생 예상됨 OR 2번째 row 공간 그대로 냅두는 방향도 고려 */}
      <main className="relative h-[calc(100%-176px)] w-full">
        <ProductListContainer searchedProducts={products} />
      </main>
    </>
  );
}
