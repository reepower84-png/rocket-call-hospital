"use client";

import { useState, useEffect } from "react";
import { Inquiry } from "@/types/inquiry";

// 어드민 비밀번호 (변경 가능)
const ADMIN_PASSWORD = "Rk3t!C@ll_H0sp2024#";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "contacted" | "completed">("all");

  // 세션 스토리지에서 인증 상태 확인
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const updateStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      const response = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: Inquiry["status"]) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      contacted: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };

    const labels = {
      pending: "대기중",
      contacted: "연락완료",
      completed: "상담완료",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredInquiries = inquiries.filter((inq) =>
    filter === "all" ? true : inq.status === filter
  );

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    completed: inquiries.filter((i) => i.status === "completed").length,
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">로켓콜 어드민</h1>
            <p className="text-gray-500 mt-2">관리자 비밀번호를 입력하세요</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="비밀번호"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                autoFocus
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-500">비밀번호가 올바르지 않습니다.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">로켓콜 어드민</h1>
              <p className="text-sm text-gray-500">병원 TM 서비스 문의 관리</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchInquiries}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                새로고침
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">전체 문의</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">대기중</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">연락완료</p>
            <p className="text-3xl font-bold text-blue-600">{stats.contacted}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 mb-1">상담완료</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "all", label: "전체" },
            { key: "pending", label: "대기중" },
            { key: "contacted", label: "연락완료" },
            { key: "completed", label: "상담완료" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === item.key
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 문의 목록 */}
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-500">문의 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      이름
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      전화번호
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      문의내용
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      신청일시
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{getStatusBadge(inquiry.status)}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{inquiry.phone}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {inquiry.message || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={inquiry.status}
                            onChange={(e) =>
                              updateStatus(inquiry.id, e.target.value as Inquiry["status"])
                            }
                            className="text-sm border rounded-lg px-2 py-1 focus:ring-2 focus:ring-cyan-500"
                          >
                            <option value="pending">대기중</option>
                            <option value="contacted">연락완료</option>
                            <option value="completed">상담완료</option>
                          </select>
                          <button
                            onClick={() => deleteInquiry(inquiry.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
