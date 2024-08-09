import ProductCard, {
  type SearchedProduct,
} from '@/components/atoms/ProductCard';

export default function ProductCardGroup({
  searchedProducts,
  displayedProductCardStartIndex,
  handleCardClick,
}: {
  searchedProducts: SearchedProduct[];
  displayedProductCardStartIndex: number;
  handleCardClick: () => void;
}) {
  const firstDisplayedCardIndex = displayedProductCardStartIndex;
  const secondDisplayedCardIndex = displayedProductCardStartIndex + 1;
  // TODO: 42.5%[카드 크기]-2%[gap] 를 swipe or drag or seemorebar click 시 eventhandler로 css 조작 with animation
  // TODO: 불투명 card를 포함한 4장 card 외 (overflow된 card들의 display: none) OR (visibility: hidden) OR (displayed item 기준 좌우 6개씩만 렌더링) 고려해보기 [if, item 수 999개 경우 Load]
  return (
    <div
      className={`relative left-[calc(6%-42.5%-2%)] flex h-full flex-nowrap items-center gap-[2%] py-4`}
    >
      {searchedProducts.map((v, i) => {
        const opaqueCardPosition =
          firstDisplayedCardIndex - 1 === i
            ? 'left'
            : secondDisplayedCardIndex + 1 === i
              ? 'right'
              : null;
        return (
          <article key={v.id} className={`h-full w-[42.5%] shrink-0`}>
            <ProductCard
              {...v}
              handleCardClick={
                [firstDisplayedCardIndex, secondDisplayedCardIndex].includes(i)
                  ? handleCardClick
                  : undefined
              }
              opaqueCardPosition={opaqueCardPosition}
            />
          </article>
        );
      })}
    </div>
  );
}
