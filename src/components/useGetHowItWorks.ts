import { useEffect, useState } from 'react';

export interface HowItWorksItem {

  _id: string;
  title: string;
  description: string;
  icon:string
  image?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export interface MenuType {
  id: string;
  name: string;
}

export function useGetHowItWorks() {
  const [data, setData] = useState<HowItWorksItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [menuTypes, setMenuTypes] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(true);
  const [services,setServices]=useState([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/cms/how-it-works`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json) => {
        setData(json.data?.howItWorks || []);
        setFaqs(json.data?.faqs || []);
        setMenuTypes(json.data?.menuTypes || []);
        setServices(json.data || [])
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, faqs, menuTypes, loading, error ,services};
} 