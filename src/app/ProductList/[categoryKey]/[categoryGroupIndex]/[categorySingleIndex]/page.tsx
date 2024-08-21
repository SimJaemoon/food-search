import CategoryDetailCarousel from '@/components/molecules/CategoryDetailCarousel';
import ProductCardGroupContainer from '@/components/containers/ProductCardGroupContainer';
import { type SearchedProduct } from '@/components/atoms/ProductCard';
import ProductListStandContainer from '@/components/containers/ProductListStandContainer';
import { type ProductCategory } from '@/lib/data/productCategoryDetailData';

// TODO: 데이터 fetch로 변경[검색 방식 : 1. params  2. 검색어[기존 categoryGroupId, categorySingleId 목록이 아닌 categoryId 목록을 표시 - 즉, nav를 2줄에서 1줄에 대한 데이터만 취득]]
const searchedProducts: SearchedProduct[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: i + 1,
    brand: 'brand' + (i + 1),
    imageUrl: '/product-card/' + (((i + 1) % 2) + 1) + '.png',
    name: 'product name ' + (i + 1),
    price: 300000 + i + 1,
    quantity: {
      unit: 'g',
      value: 400 + i + 1,
    },
    review: {
      starRating: 4.9,
      number: 123456,
    },
  }),
);

export default function ProductList({
  params,
}: {
  params: {
    categoryKey: ProductCategory;
    categoryGroupIndex: string;
    categorySingleIndex: string;
  };
}) {
  // TODO: 접근 불가능한 url param 값 처리 - error page
  const categoryKey = params.categoryKey;
  const categoryGroupIndex = parseInt(params.categoryGroupIndex);
  const categorySingleIndex = parseInt(params.categorySingleIndex);

  return (
    <>
      <nav className="h-[80px] w-full">
        {/* 세부 카테고리 - 그룹 */}
        <div className="relative flex h-8 w-full items-center overflow-hidden px-3">
          <CategoryDetailCarousel
            categoryKey={categoryKey}
            categoryGroupIndex={categoryGroupIndex}
            categorySingleIndex={categorySingleIndex}
            type="categoryDetailGroup"
          />
        </div>
        {/* 세부 카테고리 - 단일 */}
        <div className="relative flex h-12 w-full items-center overflow-hidden px-3">
          <CategoryDetailCarousel
            categoryKey={categoryKey}
            categoryGroupIndex={categoryGroupIndex}
            categorySingleIndex={categorySingleIndex}
            type="categoryDetailSingle"
          />
        </div>
      </nav>
      {/* TODO: 검색어를 통한 page 진입시 nav 가 1줄로 바뀜으로 인한 main tag height의 176px 에 변화 발생 예상됨 OR 2번째 row 공간 그대로 냅두는 방향도 고려 */}
      <main className="relative h-[calc(100%-176px)] w-full">
        {/* 상품 목록 card carousel */}
        <article className="relative z-10 h-[calc(100%-120px)] w-full overflow-hidden">
          <ProductCardGroupContainer searchedProducts={searchedProducts} />
        </article>
        {/* 매대 상자 */}
        <div className="absolute bottom-4 left-[12px] h-[148px] w-[calc(100%-24px)]">
          {/* 윗면 */}
          <div className="absolute left-[0] top-[0] h-11 w-full bg-background [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondaryEmphasize [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]"></div>
          </div>
          {/* 정면 */}
          <div className="absolute left-[12px] top-[44px] h-[calc(100%-44px)] w-[calc(100%-12px)] border-[0.5px] border-background bg-secondary shadow-figma">
            <ProductListStandContainer
              totalItemNumber={searchedProducts.length}
            />
          </div>
          {/* 측면 */}
          <div className="absolute left-[0] top-[0] h-full w-3 bg-background [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondary [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
