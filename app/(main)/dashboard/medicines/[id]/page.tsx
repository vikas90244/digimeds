import MedicineDetail from "@/components/medicine/MedicineDetail";

export default async function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MedicineDetail id={id} />;
}
