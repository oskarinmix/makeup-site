import type { TranslationKeys } from './en';

export const es: TranslationKeys = {
  // Navigation
  nav: {
    products: 'Productos',
    categories: 'Categorías',
    trackOrder: 'Rastrear Pedido',
  },

  // Header/Footer
  layout: {
    quickLinks: 'Enlaces Rápidos',
    cart: 'Carrito',
    customerService: 'Atención al Cliente',
    contactUs: 'Contáctanos',
    shippingInfo: 'Info de Envío',
    returns: 'Devoluciones',
    tagline: 'Productos de maquillaje premium para el entusiasta de la belleza moderna.',
    copyright: 'Todos los derechos reservados.',
  },

  // Homepage
  home: {
    newCollection: '¡Nueva Colección Disponible!',
    heroTitle: 'Desata Tu',
    heroTitleHighlight: 'Brillo Interior',
    heroSubtitle: 'Maquillaje premium seleccionado para el entusiasta de la belleza moderna. Eleva tu rutina de belleza con nuestra colección exclusiva',
    shopNow: 'Comprar Ahora',
    browseCategories: 'Ver Categorías',
    rating: 'Calificación',
    verifiedProducts: 'Productos Verificados',
    freeShippingOver: 'Envío Gratis Sobre $50',
    featuredProducts: 'Productos Destacados',
    handpickedFavorites: 'Favoritos seleccionados de nuestra colección',
    viewAll: 'Ver Todo',
    whyChooseUs: '¿Por Qué Elegir GlamStore?',
    yourBeautyOurPassion: 'Tu belleza, nuestra pasión',
    premiumQuality: 'Calidad Premium',
    premiumQualityDesc: 'Productos cuidadosamente seleccionados de marcas confiables que entregan resultados',
    expertSelection: 'Selección Experta',
    expertSelectionDesc: 'Productos elegidos por profesionales del maquillaje que conocen la belleza a fondo',
    customerCare: 'Atención al Cliente',
    customerCareDesc: 'Soporte dedicado para todas tus necesidades de belleza, en cada paso del camino',
    readyToGlow: '¿Lista para Brillar?',
    startYourJourney: 'Comienza tu viaje de belleza hoy con ofertas exclusivas',
    exploreAllProducts: 'Explorar Todos los Productos',
  },

  // Products
  products: {
    title: 'Nuestros Productos',
    subtitle: 'Descubre nuestra colección curada de productos de maquillaje premium',
    filters: 'Filtros',
    searchProducts: 'Buscar Productos',
    searchPlaceholder: 'Buscar por nombre, descripción, marca...',
    categoriesLabel: 'Categorías',
    brandsLabel: 'Marcas',
    clearAllFilters: 'Limpiar Todos los Filtros',
    activeFilters: 'Filtros Activos:',
    search: 'Búsqueda:',
    productsFound: 'productos encontrados',
    productFound: 'producto encontrado',
    sortBy: 'Ordenar por',
    nameAZ: 'Nombre: A-Z',
    nameZA: 'Nombre: Z-A',
    priceLowHigh: 'Precio: Menor a Mayor',
    priceHighLow: 'Precio: Mayor a Menor',
    description: 'Descripción',
    shadeColor: 'Tono/Color:',
    size: 'Tamaño:',
    sku: 'SKU:',
    ingredients: 'Ingredientes',
    sale: 'Oferta',
    featured: 'Destacado',
  },

  // Stock Status
  stock: {
    inStock: 'En Stock',
    lowStock: 'Poco Stock',
    outOfStock: 'Agotado',
  },

  // Cart
  cart: {
    title: 'Carrito de Compras',
    empty: 'Tu Carrito está Vacío',
    emptyMessage: 'Parece que aún no has agregado nada a tu carrito.',
    startShopping: 'Empezar a Comprar',
    continueShopping: 'Seguir Comprando',
    proceedToCheckout: 'Ir al Checkout',
    viewFullCart: 'Ver Carrito Completo',
    subtotal: 'Subtotal',
    items: 'artículos',
    total: 'Total',
    shippingNote: 'El envío e impuestos se calcularán en el checkout.',
    addedToCart: 'Agregado al carrito',
    addedToCartDesc: 'ha sido agregado a tu carrito.',
    addToCart: 'Agregar al Carrito',
    adding: 'Agregando...',
    error: 'Error',
    addError: 'Error al agregar artículo al carrito. Por favor intenta de nuevo.',
    qty: 'Cant:',
  },

  // Checkout
  checkout: {
    title: 'Checkout',
    shippingInfo: 'Información de Envío',
    fullName: 'Nombre Completo',
    email: 'Correo Electrónico',
    phone: 'Teléfono (Opcional)',
    shippingAddress: 'Dirección de Envío',
    city: 'Ciudad',
    state: 'Estado/Provincia',
    postalCode: 'Código Postal',
    paymentShipping: 'Pago y Envío',
    paymentMethod: 'Método de Pago',
    selectPayment: 'Selecciona método de pago',
    shippingMethod: 'Método de Envío',
    selectShipping: 'Selecciona método de envío',
    orderNotes: 'Notas del Pedido (Opcional)',
    notesPlaceholder: 'Instrucciones especiales...',
    placeOrder: 'Realizar Pedido',
    processing: 'Procesando...',
    orderSummary: 'Resumen del Pedido',
    shipping: 'Envío',
    selectShippingMethod: 'Selecciona método de envío',
    free: 'GRATIS',
    days: 'días',
    freeShippingApplied: '¡Envío gratis aplicado!',
    paymentVerificationNote: 'El pago será verificado manualmente después de realizar el pedido.',
    orderPlaced: '¡Pedido realizado con éxito!',
    orderNumber: 'Número de pedido:',
    loadError: 'Error al cargar métodos de pago y envío.',
    submitError: 'Error al realizar el pedido. Por favor intenta de nuevo.',
    // Validation messages
    validation: {
      nameMin: 'El nombre debe tener al menos 2 caracteres',
      invalidEmail: 'Dirección de correo inválida',
      addressRequired: 'La dirección es requerida',
      cityRequired: 'La ciudad es requerida',
      stateRequired: 'El estado es requerido',
      postalRequired: 'El código postal es requerido',
      selectPayment: 'Por favor selecciona un método de pago',
      selectShipping: 'Por favor selecciona un método de envío',
    },
  },

  // Success Page
  success: {
    title: '¡Pedido Realizado con Éxito!',
    thankYou: 'Gracias por tu pedido. Te enviaremos un correo de confirmación pronto.',
    orderId: 'ID del Pedido',
    verificationNote: 'Tu pago será verificado manualmente. Te contactaremos al correo electrónico que proporcionaste con instrucciones de pago y confirmación del pedido.',
    backToHome: 'Volver al Inicio',
  },

  // Common
  common: {
    error: 'Error',
  },

  // Categories Showcase & Page
  categories: {
    shopByCategory: 'Comprar por Categoría',
    exploreCollection: 'Explora nuestra colección curada de productos de belleza premium',
    title: 'Categorías',
    subtitle: 'Explora nuestra colección por categoría',
    viewProducts: 'Ver Productos',
    productsCount: 'productos',
  },

  // Brands Showcase
  brands: {
    featuredBrands: 'Marcas Destacadas',
    discoverProducts: 'Descubre productos de nuestras marcas de belleza cuidadosamente seleccionadas',
    shopNow: 'Comprar',
  },

  // Newsletter
  newsletter: {
    title: 'Únete a Nuestro Círculo de Belleza',
    subtitle: 'Obtén acceso exclusivo a nuevos productos, consejos de belleza y ofertas especiales.',
    discount: 'Además, disfruta de',
    discountAmount: '15% de descuento',
    discountSuffix: '¡en tu primer pedido!',
    placeholder: 'Ingresa tu correo electrónico',
    subscribe: 'Suscribirse',
    subscribing: 'Suscribiendo...',
    noSpam: 'Sin spam, nunca. Cancela cuando quieras.',
    successTitle: '¡Bienvenido a nuestra comunidad de belleza!',
    successDesc: '¡Gracias por suscribirte! Revisa tu bandeja de entrada para ofertas exclusivas.',
  },

  // Mobile Filters
  mobileFilters: {
    filters: 'Filtros',
    filterProducts: 'Filtrar Productos',
    refineSearch: 'Refina tu búsqueda por categoría, marca o palabras clave',
  },
} as const;
