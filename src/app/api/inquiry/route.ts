import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function sendDiscordNotification(name: string, phone: string, message: string) {
  console.log("=== Discord 알림 전송 시작 ===");
  console.log("고객명:", name);
  console.log("연락처:", phone);

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  console.log("Webhook URL 존재 여부:", !!webhookUrl);
  console.log("Webhook URL 앞 50자:", webhookUrl?.substring(0, 50));

  if (!webhookUrl) {
    console.error("Discord webhook URL is not configured!");
    return;
  }

  const now = new Date();
  const koreaTime = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const embed = {
    title: "📞 새로운 상담 신청이 접수되었습니다!",
    color: 0x00d4aa,
    fields: [
      {
        name: "👤 고객명",
        value: name,
        inline: true,
      },
      {
        name: "📱 연락처",
        value: phone,
        inline: true,
      },
      {
        name: "💬 문의 내용",
        value: message || "없음",
        inline: false,
      },
      {
        name: "🕐 접수 시간",
        value: koreaTime,
        inline: false,
      },
    ],
    footer: {
      text: "로켓콜-병원",
    },
    timestamp: now.toISOString(),
  };

  try {
    console.log("Discord API 호출 중...");
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    console.log("Discord API 응답 상태:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook error:", response.status, errorText);
    } else {
      console.log("=== Discord 알림 전송 성공! ===");
    }
  } catch (error) {
    console.error("Failed to send Discord notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수입니다." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("inquiries").insert([
      {
        name,
        phone,
        message: message || "",
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "데이터 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // Discord 알림 전송 (비동기로 처리하여 응답 지연 방지)
    console.log("sendDiscordNotification 함수 호출 시작");
    sendDiscordNotification(name, phone, message).catch((err) => {
      console.error("sendDiscordNotification 에러:", err);
    });

    return NextResponse.json(
      { success: true, message: "상담 신청이 완료되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
