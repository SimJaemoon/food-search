import SpeechBubble from '@/components/atoms/SpeechBubble';

export default function OrderAddress() {
  return (
    <>
      <main className="flex h-[calc(100%-48px-40px-48px)] w-full flex-col gap-8 px-3 pt-8">
        {/* question */}
        <div className="flex w-full flex-col gap-2">
          <SpeechBubble
            type="question"
            content="상품 받을 곳이 아래 주소가 맞나요?"
          />
          <div className="flex w-[calc(86%-16px)] flex-wrap gap-1 rounded-md bg-secondary p-2 shadow-1">
            <div className="flex w-full items-center rounded-sm bg-background px-2 py-[6px]">
              <div className="shrink-0 pr-1">{`배송지  : `}</div>
              <div className="break-all">{`${'가나다바사'}`}</div>
            </div>
            <div className="flex w-full flex-wrap items-center rounded-sm bg-background px-2 py-3">
              <div className="w-full break-all">
                {'서울특별시 동대문구 000로 123-000'}
              </div>
              <div className="w-full break-all">
                {'000아파트 000동 000호 가나다마바사'}
              </div>
            </div>
          </div>
        </div>
        {/* Answer */}
        <div className="flex w-full flex-col items-end gap-3">
          <SpeechBubble type="answer" content="네, 맞아요" />
          <SpeechBubble
            type="answer"
            content="아니에요, 다른 장소로 배송해 주세요"
          />
        </div>
      </main>
    </>
  );
}
