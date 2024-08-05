import Header from '@/components/organisms/Header';
import CategoryDetailCarousel from '@/components/molecules/CategoryDetailCarousel';
import { mockProductCategoryData } from '@/lib/data/productCategoryData';

export default function ProductList({
  params,
}: {
  params: {
    categoryId: string;
    categoryGroupId: string;
    categorySingleId: string;
  };
}) {
  // FIXME: 선택된 item 탐색 code 개선(with 접근 불가능한 param 값 처리)
  const { categoryId, categoryGroupId, categorySingleId } = params;
  const [categoryIdNumber, categoryGroupIdNumber, categorySingleIdNumber] = [
    categoryId,
    categoryGroupId,
    categorySingleId,
  ].map((v) => parseInt(v));

  const selectedCategory =
    categoryIdNumber <= mockProductCategoryData.length - 1
      ? categoryIdNumber
      : 0;
  const selectedGroupItem =
    categoryGroupIdNumber <=
    mockProductCategoryData[selectedCategory].children.length - 1
      ? categoryGroupIdNumber
      : 0;
  const selectedSingleItem =
    categorySingleIdNumber <=
    mockProductCategoryData[selectedCategory].children[selectedGroupItem]
      .children.length -
      1
      ? categorySingleIdNumber
      : 0;
  // FIXME:

  return (
    <>
      <Header pageName="ProductList" />
      <nav className="h-[80px] w-full">
        {/* 세부 카테고리 - 그룹 */}
        <div className="relative flex h-8 w-full items-center overflow-hidden px-3">
          {/* FIXME: mock data 교체 */}
          <CategoryDetailCarousel
            items={mockProductCategoryData[selectedCategory].children}
            type="categoryDetailGroup"
            selectedItem={selectedGroupItem}
          />
        </div>
        {/* 세부 카테고리 - 단일 */}
        <div className="relative flex h-12 w-full items-center overflow-hidden px-3">
          <CategoryDetailCarousel
            items={
              mockProductCategoryData[selectedCategory].children[
                selectedSingleItem
              ].children
            }
            type="categoryDetailSingle"
            selectedItem={selectedSingleItem}
          />
        </div>
      </nav>
      <main className="relative h-[calc(100%-176px)] w-full">
        {/* 매대 상자 */}
        <div className="absolute bottom-4 left-[12px] h-[148px] w-[calc(100%-24px)]">
          {/* 윗면 */}
          <div className="absolute left-[0] top-[0] h-11 w-full bg-background [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondaryEmphasize [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]"></div>
          </div>
          {/* 정면 */}
          <div className="absolute left-[12px] top-[44px] h-[calc(100%-44px)] w-[calc(100%-12px)] border-[0.5px] border-background bg-secondary shadow-figma"></div>
          {/* 측면 */}
          <div className="absolute left-[0] top-[0] h-full w-3 bg-background [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondary [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]"></div>
          </div>
        </div>
        {/* 상품 목록 */}
        <ol className="absolute left-[0] top-[0] h-[calc(100%-16px-148px+28px)] w-full bg-highlight opacity-50"></ol>
      </main>
    </>
  );
}
