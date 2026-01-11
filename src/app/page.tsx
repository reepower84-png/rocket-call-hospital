"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xl font-bold text-gray-900 cursor-pointer hover:text-cyan-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 8h-1V4H8v4H3v12h8v-4h2v4h8V8h-3zm-8-2h2v2h2v2h-2v2h-2v-2H9V8h2V6zm-6 12H4v-2h1v2zm0-4H4v-2h1v2zm6 0h-2v-2h2v2zm0-4h-2V8h2v2zm6 8h-1v-2h1v2zm0-4h-1v-2h1v2zm3 4h-1v-2h1v2zm0-4h-1v-2h1v2z"/>
            </svg>
            로켓콜
          </h1>
          <a
            href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            제안서 다운로드
          </a>
        </div>
      </header>

      {/* 카카오톡 플로팅 버튼 */}
      <a
        href="http://pf.kakao.com/_zxfugn/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 animate-bounce-slow"
      >
        <div className="bg-[#FEE500] rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#3C1E1E">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.25 4.64 6.64-.2.75-.73 2.72-.84 3.14-.13.5.18.5.38.36.16-.1 2.5-1.7 3.52-2.39.75.11 1.52.17 2.3.17 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
        </div>
      </a>

      {/* 히어로 섹션 */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            병원 전문 약속콜 서비스
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            고객 유치,<br/>
            <span className="gradient-text">더 이상 고민하지 마세요</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            확정된 고객만 딱! 병원에 보내드립니다.<br/>
            5년 이상의 TM 전문가가 예약까지 잡아드리는 프리미엄 서비스
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md">
              <span className="text-3xl font-bold text-cyan-600">98%</span>
              <span className="text-gray-600 text-sm">약속 성사율</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md">
              <span className="text-3xl font-bold text-cyan-600">5,000+</span>
              <span className="text-gray-600 text-sm">누적 매칭</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md">
              <span className="text-3xl font-bold text-cyan-600">150+</span>
              <span className="text-gray-600 text-sm">파트너 병원</span>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-cyan-200"
          >
            지금 바로 상담 신청하기 →
          </button>

          <div className="mt-16 animate-scroll">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 문제점 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            이런 고민, 한 번쯤 해보셨죠? 🤔
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            많은 병원들이 고객 유치에 어려움을 겪고 있습니다
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: "😰", title: "광고비는 많이 쓰는데...", desc: "실제 내원으로 이어지는 고객이 적어요" },
              { emoji: "📞", title: "전화 상담 인력 부족", desc: "고객 문의 전화를 놓치는 경우가 많아요" },
              { emoji: "🚫", title: "노쇼가 너무 많아요", desc: "예약해놓고 안 오는 고객이 많아 손실이 커요" },
              { emoji: "⏰", title: "시간이 없어요", desc: "진료에 집중하고 싶은데 마케팅까지 신경쓰기 힘들어요" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-cyan-300 transition-colors"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 솔루션 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            로켓콜의 2단계 검증 시스템 ✅
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            확정된 고객만 보내드리는 비결, 철저한 2단계 검증
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1차 컨택</h3>
              <p className="text-gray-600 leading-relaxed">
                잠재 고객에게 먼저 연락하여 병원 방문에 대한 <strong>관심도와 니즈를 파악</strong>합니다.
                단순 관심이 아닌, 실제 방문 의향이 있는 분들만 선별합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl hover-lift">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2차 컨택 (약속콜)</h3>
              <p className="text-gray-600 leading-relaxed">
                1차에서 선별된 분들에게 다시 연락하여 <strong>정확한 예약 일시를 확정</strong>합니다.
                확정된 고객만 병원에 연결해드리니 노쇼 걱정 없이 진료에 집중하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 장점 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            왜 로켓콜인가요? 🚀
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            병원 전문 TM 서비스, 로켓콜만의 차별화된 강점
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "확정 고객만 연결",
                desc: "예약 확정된 고객만 연결해드려 노쇼율 최소화",
              },
              {
                icon: "⏱️",
                title: "시간 절약",
                desc: "마케팅, 상담 전화는 저희가! 원장님은 진료에만 집중하세요",
              },
              {
                icon: "📈",
                title: "월 평균 40% 이상 신환 증가",
                desc: "파트너 병원들의 평균 신환 증가율",
              },
              {
                icon: "👨‍💼",
                title: "5년+ 경력 TM팀",
                desc: "의료 분야 전문 상담 경력의 베테랑 팀이 직접 상담",
              },
              {
                icon: "🔒",
                title: "독점 고객 시스템",
                desc: "한 번 연결된 고객은 해당 병원만을 위한 독점 관리",
              },
              {
                icon: "💬",
                title: "투명한 실시간 소통",
                desc: "매칭 현황, 예약 일정 등 실시간으로 공유해드립니다",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-cyan-300 hover:shadow-lg transition-all hover-lift"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToForm}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-cyan-200"
            >
              무료 상담 신청하기 →
            </button>
          </div>
        </div>
      </section>

      {/* 프로세스 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            간단한 4단계로 시작하세요 📋
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            복잡한 절차 없이 간편하게 시작할 수 있습니다
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "상담 신청", desc: "간단한 정보 입력으로 상담 신청" },
              { step: "02", title: "맞춤 상담", desc: "병원 특성에 맞는 최적의 플랜 제안" },
              { step: "03", title: "약속콜 진행", desc: "전문 TM팀이 고객 예약 확정" },
              { step: "04", title: "고객 연결", desc: "확정된 고객 정보 전달 및 내원" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            파트너 병원들의 생생한 후기 ⭐
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            로켓콜과 함께 성장하고 있는 병원들의 이야기
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "김** 원장님",
                hospital: "S정형외과",
                content: "광고비만 쓰고 실제 고객 유치가 안 되서 고민이었는데, 로켓콜 시작 후 신환이 눈에 띄게 늘었어요. 노쇼도 거의 없고요!",
              },
              {
                name: "이** 원장님",
                hospital: "H치과의원",
                content: "진료에만 집중할 수 있어서 좋습니다. 상담 전화 응대할 인력이 부족했는데 그 부분을 로켓콜이 완벽히 해결해줬어요.",
              },
              {
                name: "박** 원장님",
                hospital: "M피부과",
                content: "처음엔 반신반의했는데 첫 달부터 결과가 나왔어요. 확정된 고객만 보내주니까 효율이 정말 좋습니다.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-cyan-300 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{item.content}&rdquo;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.hospital}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 보장 제도 섹션 */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            100% 약속 보장 제도 🛡️
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            만약 확정된 고객이 노쇼할 경우,<br/>
            <strong className="text-white">무료로 재배정</strong>해드립니다.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur px-6 py-3 rounded-full">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">노쇼 시 100% 무료 재배정</span>
          </div>
        </div>
      </section>

      {/* 상품 안내 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            맞춤 상품 안내 💎
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            병원 규모와 목표에 맞는 최적의 상품을 선택하세요
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-2xl border-2 border-cyan-200 hover-lift relative">
              <div className="absolute -top-3 left-6 bg-cyan-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                인기 상품
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">확정 고객 DB</h3>
              <p className="text-gray-600 mb-6">예약 확정된 고객만 연결해드리는 프리미엄 서비스</p>
              <ul className="space-y-3 mb-8">
                {[
                  "2단계 검증 완료 고객",
                  "예약 일시 확정",
                  "노쇼 시 무료 재배정",
                  "실시간 매칭 현황 공유",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                상담 신청하기
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover-lift">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">관심 고객 DB</h3>
              <p className="text-gray-600 mb-6">방문 관심이 확인된 잠재 고객 DB 제공</p>
              <ul className="space-y-3 mb-8">
                {[
                  "1차 관심도 확인 완료",
                  "방문 니즈 파악된 고객",
                  "병원에서 직접 예약 진행",
                  "합리적인 가격",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                상담 신청하기
              </button>
            </div>
          </div>

                  </div>
      </section>

      {/* 문의 폼 섹션 */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            무료 상담 신청 📝
          </h2>
          <p className="text-gray-600 text-center mb-8">
            아래 정보를 입력해주시면 빠르게 연락드리겠습니다
          </p>

          {submitStatus === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">상담 신청이 완료되었습니다!</h3>
              <p className="text-gray-600">빠른 시일 내에 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 문의 내용
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                    placeholder="궁금하신 내용을 자유롭게 적어주세요"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                {isSubmitting ? "신청 중..." : "상담 신청하기"}
              </button>

              {submitStatus === "error" && (
                <p className="mt-4 text-red-500 text-center text-sm">
                  오류가 발생했습니다. 다시 시도해주세요.
                </p>
              )}

              <p className="mt-4 text-xs text-gray-500 text-center">
                입력하신 정보는 상담 목적으로만 사용됩니다.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 8h-1V4H8v4H3v12h8v-4h2v4h8V8h-3zm-8-2h2v2h2v2h-2v2h-2v-2H9V8h2V6zm-6 12H4v-2h1v2zm0-4H4v-2h1v2zm6 0h-2v-2h2v2zm0-4h-2V8h2v2zm6 8h-1v-2h1v2zm0-4h-1v-2h1v2zm3 4h-1v-2h1v2zm0-4h-1v-2h1v2z"/>
                </svg>
                로켓콜
              </h3>
              <p className="text-sm">병원 전문 약속콜 TM 서비스</p>
            </div>
            <div className="flex gap-6">
              <a
                href="http://pf.kakao.com/_zxfugn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                카카오톡 상담
              </a>
              <a
                href="https://drive.google.com/file/d/1FGpJjks9asLnWIAS6wd7be0ARZDssLNM/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                제안서 다운로드
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p className="mb-2">상호: 제이코리아, 대표: 이주영, 사업자등록번호: 278-30-01540</p>
            <p>© 2024 로켓콜. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
