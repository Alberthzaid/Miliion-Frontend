import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TypeProperty } from "@/Types/TypeProperty";
import propertyUtils from "@/Utils/PropertyUtils";


export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  price?: number;
}

export interface ChromaGridProps {
  properties?: TypeProperty[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  columns?: number;
  onPropertyClick?: (property: TypeProperty) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  properties = [],
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  columns,
  onPropertyClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // Colores predefinidos para generar gradientes
  const colorPalette = [
    "#4F46E5", // Indigo
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#F97316", // Orange
    "#DC2626", // Red-600
    "#7C3AED", // Purple
    "#059669", // Green
    "#D97706", // Orange-600
    "#BE123C", // Rose
  ];


  const generateColorFromId = (id: string): string => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const index = Math.abs(hash) % colorPalette.length;
    return colorPalette[index];
  };

  const generateGradient = (color: string): string => {
    const angles = [135, 145, 165, 180, 195, 210, 225, 270];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    return `linear-gradient(${randomAngle}deg, ${color}, #000)`;
  };

  const convertPropertiesToChromaItems = (props: TypeProperty[]): ChromaItem[] => {
    return props.map((property) => {
      const borderColor = generateColorFromId(property.id);
      return {
        image: property.image.fileLink,
        title: property.name,
        subtitle: property.owner.name,
        handle: propertyUtils.formatPrice(property.price),
        location: property.address.split(',')[0], 
        borderColor,
        gradient: generateGradient(borderColor),
        price: property.price,
      };
    });
  };

  // Datos demo actualizados con estructura de propiedades
  const demoProperties: TypeProperty[] = [
    {
      id: "demo-2",
      idOwner: "owner-2",
      name: "Apartamento Ejecutivo Centro",
      address: "Carrera 10 #26-51, Bogotá, Colombia",
      price: 280000000,
      image: {
        id: "img-2",
        idProperty: "demo-2",
        fileLink: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      owner: {
        id: "owner-2",
        name: "Carlos Rodríguez",
        address: "Calle 72 #15-28, Bogotá, Colombia",
        photo: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        birthday: "1985-07-22T00:00:00Z"
      }
    },
    {
      id: "demo-3",
      idOwner: "owner-3",
      name: "Casa Familiar Chapinero",
      address: "Calle 63 #11-45, Bogotá, Colombia",
      price: 650000000,
      image: {
        id: "img-3",
        idProperty: "demo-3",
        fileLink: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      owner: {
        id: "owner-3",
        name: "Ana Patricia Muñoz",
        address: "Carrera 7 #68-15, Bogotá, Colombia",
        photo: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        birthday: "1992-11-08T00:00:00Z"
      }
    },
    {
      id: "demo-5",
      idOwner: "owner-5",
      name: "Casa Quinta La Calera",
      address: "Vereda San José, La Calera, Cundinamarca",
      price: 750000000,
      image: {
        id: "img-5",
        idProperty: "demo-5",
        fileLink: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      owner: {
        id: "owner-5",
        name: "Patricia Herrera",
        address: "Calle 116 #7-15, Bogotá, Colombia",
        photo: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        birthday: "1987-09-14T00:00:00Z"
      }
    },
  ];

  const dataToUse = properties.length > 0 ? properties : demoProperties;
  const chromaItems = convertPropertiesToChromaItems(dataToUse);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (index: number) => {
    const property = dataToUse[index];
    if (onPropertyClick) {
      onPropertyClick(property);
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const cardWidth = 300;

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-200px ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2"
      >
        <div 
          className="grid gap-3 p-1"
          style={{
            gridTemplateColumns: `repeat(${columns}, ${cardWidth}px)`,
            justifyContent: 'center',
          }}
        >
          {chromaItems.map((c, i) => (
            <article
              key={`property-${dataToUse[i].id}`}
              onMouseMove={handleCardMove}
              onClick={() => handleCardClick(i)}
              className="group relative flex flex-col rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
              style={
                {
                  width: `${cardWidth}px`,
                  height: '320px',
                  "--card-border": c.borderColor || "transparent",
                  background: c.gradient,
                  "--spotlight-color": "rgba(255,255,255,0.3)",
                } as React.CSSProperties
              }
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                }}
              />
              <div className="relative z-10 flex-1 p-[10px] box-border">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <footer className="relative z-10 p-3 text-white font-sans">
                <div className="grid grid-cols-1 gap-y-1 mb-2">
                  <h3 className="m-0 text-[1.05rem] font-semibold leading-tight">
                    {c.title}
                  </h3>
                  <p className="m-0 text-[0.85rem] opacity-85 leading-tight">
                    {c.location}
                  </p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 items-center">
                  <span className="text-[0.9rem] opacity-90">
                    Propietario: {c.subtitle}
                  </span>
                  <div className="text-right">
                    <span className="text-[1.1rem] font-bold text-white">
                      {c.handle}
                    </span>
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* Overlay para el efecto chroma */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;