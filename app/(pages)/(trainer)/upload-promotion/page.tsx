"use client";
import { useState, useEffect } from "react";
import { 
  useCreatePromotionMutation, 
  useUpdatePromotionMutation 
} from "../../redux/features/promotionApi";

export default function PromotionForm({ trainerId, promotion }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    discountAmount: "",
    discountPercentage: "",
    promoCode: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const [createPromotion] = useCreatePromotionMutation();
  const [updatePromotion] = useUpdatePromotionMutation();

  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.name || "",
        description: promotion.description || "",
        discountAmount: promotion.discountAmount || "",
        discountPercentage: promotion.discountPercentage || "",
        promoCode: promotion.promoCode || "",
        startDate: promotion.startDate || "",
        endDate: promotion.endDate || "",
        isActive: promotion.isActive ?? true,
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promoData = { ...formData, trainerId };
    if (promotion) {
      await updatePromotion({ id: promotion.id, ...promoData });
    } else {
      await createPromotion(promoData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Promotion Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="number" name="discountAmount" value={formData.discountAmount} onChange={handleChange} placeholder="Discount Amount" />
      <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Discount Percentage" />
      <input type="text" name="promoCode" value={formData.promoCode} onChange={handleChange} placeholder="Promo Code" />
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
      <label>
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /> Active
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {promotion ? "Update Promotion" : "Create Promotion"}
      </button>
    </form>
  );
}
