import { type ProductCategory } from '@/lib/data/data';
import Icon from '@/components/atoms/Icon';
import ProductCategroyBox from '@/components/atoms/ProductCategoryBox';
import { iconData } from '@/lib/UI/dataset/iconData';

export default function ProductCategoryGroup({
  displayedProductCategories,
  totalPageNumber,
  pageNumber,
  handleNextButtonClick,
  handleBackButtonClick,
}: {
  displayedProductCategories: ProductCategory[];
  totalPageNumber: number;
  pageNumber: number;
  handleNextButtonClick: () => void;
  handleBackButtonClick: () => void;
}) {
  return (
    <ol
      className="absolute left-[0] top-[0] z-10 h-full w-full"
      aria-label="상품 카테고리 목록"
    >
      {/* first row */}
      <li className="absolute left-[0] top-[0] h-[43.5%] w-full">
        <ol>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[0]}
              rowOrder="firstRow"
              direction="left"
              pageNumber={pageNumber}
            />
          </li>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[1]}
              rowOrder="firstRow"
              direction="right"
              pageNumber={pageNumber}
            />
          </li>
        </ol>
      </li>
      {/* second row */}
      <li className="absolute left-[0] top-[30%] h-[28%] w-full">
        <ol>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[2]}
              rowOrder="secondRow"
              direction="left"
              pageNumber={pageNumber}
            />
          </li>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[3]}
              rowOrder="secondRow"
              direction="right"
              pageNumber={pageNumber}
            />
          </li>
        </ol>
      </li>
      {/* pagination arrow */}
      <li className="absolute left-[0] top-[58%] flex h-[8.5%] w-full justify-between">
        <button
          className={`${pageNumber === 1 ? 'invisible' : ''} flex w-[20%] items-center justify-center pl-2`}
          aria-label={iconData.back.text}
          onClick={handleBackButtonClick}
        >
          <Icon iconName="back" />
        </button>
        <button
          className={`${pageNumber === totalPageNumber ? 'invisible' : ''} flex w-[20%] items-center justify-center pr-2`}
          aria-label={iconData.next.text}
          onClick={handleNextButtonClick}
        >
          <Icon iconName="next" />
        </button>
      </li>
      {/* third row */}
      <li className="absolute left-[0] top-[66.5%] h-[33.5%] w-full">
        <ol>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[4]}
              rowOrder="thirdRow"
              direction="left"
              pageNumber={pageNumber}
            />
          </li>
          <li>
            <ProductCategroyBox
              displayedProductCategory={displayedProductCategories[5]}
              rowOrder="thirdRow"
              direction="right"
              pageNumber={pageNumber}
            />
          </li>
        </ol>
      </li>
    </ol>
  );
}
