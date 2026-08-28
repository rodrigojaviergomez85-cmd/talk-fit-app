Corregir velocidad del paso 4 que se queda en 0.75

Diagnóstico: React reutiliza el componente `Shadowing` entre los pasos 3 y 4 porque tienen el mismo tipo y no hay `key`. Eso hace que el estado interno `speed` del paso 3 (0.75) persista al entrar al paso 4, aunque la prop `rate` sea 1.

Cambios en `src/routes/practice.tsx`:

1. Dentro del componente `Shadowing`, agregar un `useEffect` que sincronice `speed` con `rate` cuando este cambie:
   ```tsx
   useEffect(() => {
     setSpeed(rate);
   }, [rate]);
   ```
   Esto asegura que, al cambiar de paso, la velocidad refleje la prop del nuevo paso sin perder la capacidad de ajustarla manualmente dentro del mismo paso.

2. Verificar que el subtítulo `${heading} · ${speed}x speed` muestre `1x speed` al entrar al paso 4.

No se modifica la lógica de botones de velocidad ni ningún otro paso.

Verificar typecheck y reproducir el flujo paso 3 → paso 4 en el preview para confirmar que el paso 4 arranca en 1×.
