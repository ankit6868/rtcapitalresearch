"use client";
import { useRouter } from "next/navigation";
export default function DeleteEnquiryBtn({ id }: { id: string }) {
  const router = useRouter();
  const del = async () => {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    router.push("/admin/enquiries");
    router.refresh();
  };
  return <button className="a-btn a-btn-danger" onClick={del}>Delete</button>;
}
