<template>
  <nav class="bg-black-100 p-3 grid grid-cols-2 font-text justify-between">
    <img src="/img/logo.svg" alt="nono" class="w-40"/>
    <ul class="hidden md:flex items-center justify-end">
      <li class="mr-6">
        <a class="text-white-100 hover:text-blue-800" href="#">Aktywności</a>
      </li>
      <li class="mr-6">
        <a class="text-white-100 hover:text-blue-800" href="#">O Nas</a>
      </li>
      <li class="mr-6">
        <a class="text-white-100 hover:text-blue-800" href="#">Blog</a>
      </li>
      <li class="mr-6">
        <button class="text-coral-100 hover:text-coral-200 border-2 p-2 rounded">Zaloguj się</button>
      </li>
    </ul>

    <div class="md:hidden flex items-center text-white-100 justify-end">
      <button class="rounded bg-black-200 p-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <div class="md:hidden bg-black-200 p-2 mt-2 rounded col-span-2 text-sm font-text">
      <ul class="text- p-4">
        <li><a class="text-white-100" href="#">Aktwności</a></li>
        <li><a class="text-white-100" href="#">O nas</a></li>
        <li><a class="text-white-100" href="#">Blog</a></li>
        <li>
          <button class="text-coral-100 hover:text-coral-200 border p-2 rounded mt-4">Zaloguj się</button>
        </li>
      </ul>
    </div>
  </nav>

  <main class="bg-black-100 h-min-[100vh] px-20 py-10">
    <div class="grid grid-cols-1 gap-4">
      <div class="flex flex-col md:flex-row-reverse justify-center items-center">
        <img src="/img/hero-image.png" alt="HeroImage" class="flex-shrink-0 object-cover inline-block md:w-[35vw]"/>
        <img src="/img/hero-banner.png" alt="HeroBanner" class="flex-shrink-0 object-cover inline-block md:w-[35vw]"/>
      </div>
      <div class="flex justify-center md:justify-start mt-20 text-lg">
        <button
            class="bg-coral-100 px-6 border-2 border-coral-100 hover:transition-all hover:text-coral-100 hover:bg-black-200 hover:border-coral-100 text-white-100 rounded p-4">
          Dołacz do nas
        </button>
      </div>
    </div>
  </main>
  <!--    <div class="about-us w-[100vw] h-[80vh]">-->
  <!--      <div class="h-[80vh] w-[100%] bg-white-200 absolute left-0 top-0 z-2">-->
  <!--        <img class="float-right h-[600px] -mt-20" src="/img/badmintoniara.png" alt="babigtoniara">-->
  <!--      </div>-->
  <!--      <div class="h-[80vh] w-[100%] pl-10 bg-coral-100 absolute left-0 top-0 z-10"-->
  <!--           style="clip-path: polygon(0% 0%, 71% 0%, 71% 0%, 55% 50%, 72% 100%, 72% 100%, 0% 100%, 0% 100%)"-->

  <!--      >-->
  <!--        <h1 class="font-heading font-bold text-3xl text-white-100 py-10">O nas</h1>-->

  <!--        <p class="text-sm text-white-100 font-text w-[40vw]">-->
  <!--          Jesteśmy grupą entuzjastów badmintona, którzy podzielają pasję do tej dynamicznej gry.-->
  <!--          Wspólnie stworzyliśmy miejsce, gdzie każdy, bez względu na poziom umiejętności, może dołączyć do nas, by grać, trenować, uczestniczyć w turniejach oraz sparingach.-->
  <!--          <br/><br/>Naszym celem jest budowanie społeczności, która wspiera się nawzajem w dążeniu do lepszej gry i zdrowszego stylu życia.-->
  <!--          Organizujemy regularne spotkania, gdzie możemy nie tylko rywalizować, ale także wymieniać się doświadczeniami i radami, jak stać się lepszymi graczami.-->
  <!--          <br/><br/>Niezależnie od tego, czy ktoś szuka relaksu  i dobrej zabawy, czy też intensywnego treningu i rywalizacji, nasze drzwi są zawsze otwarte. Wierzymy, że badminton to więcej niż sport – to sposób na budowanie przyjaźni, poprawę samopoczucia i cieszenie się aktywnością fizyczną w dobrym towarzystwie.-->
  <!--        </p>-->
  <!--      </div>-->
  <!--      <div class="h-[80vh] w-[100%] bg-coral-200 absolute left-0 top-0 z-9"-->
  <!--           style="clip-path: polygon(0% 0%, 71% 0%, 71% 0%, 60% 45%, 72% 100%, 72% 100%, 0% 100%, 0% 100%)"-->
  <!--      ></div>-->
  <!--    </div>-->

  <footer class="font-text bg-black-100">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="https://flowbite.com/" class="flex items-center">
            <img src="/img/logo.svg" alt="Pykanko Icon" class="w-24"/>
          </a>
          <div class="flex mt-2">
            <a class="w-4 mr-0.5">
              <img src="/img/icon-whatsapp.png" alt="Whats'up Icon" class="w-24"/>
            </a>
            <a class="w-4">
              <img src="/img/icon-facebook.png" alt="Facebook Icon" class="w-24"/>
            </a>

          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h2 class="mb-6 font-bold text-sm font-text text-coral-100 uppercase">Strona</h2>
            <ul class="text-xs text-black-300">
              <li class="pb-2">
                <a href="#about-us" class="hover:underline">O nas</a>
              </li>
              <li class="pb-2">
                <a href="#activites" class="hover:underline">Aktywności</a>
              </li>
              <li class="pb-2">
                <a href="#blog" class="hover:underline">Blog</a>
              </li>
              <li class="pb-2">
                <a href="#activites" class="hover:underline">Zaloguje się</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 font-bold text-sm font-text text-coral-100 uppercase">Kontakt</h2>
            <ul class="text-xs text-black-300">
              <li class="pb-2">
                <a href="#" class="hover:underline">gliwickie-pykanko.com</a>
              </li>
              <li class="pb-2">
                <a href="#todo" class="hover:underline">728 869 323</a>
              </li>
              <li class="pb-2">
                <a class="hover:underline">
                  Hala Sportowa <br/>
                  ul. Chorzowska 5 <br/>
                  Gliwice
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-black-300 mt-6 font-text text-[10px]">
        <div>Images provided by <strong>freepik</strong></div>
        <div>© Copyright Gliwickie Pykanko</div>
      </div>
    </div>
  </footer>

  <div class="activities">
    <header class="flex flex-row bg-white-200 justify-center items-center p-3">
      <img class="h-[100px] mr-4" src="/img/location-pin.png" alt="location-pin">
      <h1 class="font-heading text-3xl text-black-100">
        Hala Sportowa<br/>
        Gliwice, ul. Chorzowska 5
      </h1>
    </header>
    <section class="bg-white-100 grid grid-cols-12">
      <div class="col-span-12 md:col-span-3 flex flex-row md:flex-col justify-between md:border-r-2">
        <div class="font-bold font-heading pt-5 pb-5">
          PYKANKO
        </div>
        <div class="font-bold font-heading pt-5 pb-5">
          LIGA DEBLOWA
        </div>
        <div class="font-bold font-heading pt-5 pb-5">
          TRENINGI
        </div>
        <div class="z-10 font-bold text-coral-100 font-heading md:border-r-2 border-coral-100 pt-5 pb-5 -mr-0.5">
          TURNIEJE
        </div>
      </div>
      <div class="col-span-12 md:col-span-9 bg-white-100">
        <div class="flex flex-col md:flex-row items-center">
          <div class="flex-none p-10 w-[200px]">
            <img class="w-[200px]" src="/img/icon-turnaments.png" alt="#"/>
          </div>
          <div class="">
            <h1 class="text-4xl font-heading font-bold text-coral-100 pb-[3rem]">TURNIEJE</h1>
            <p class="text-sm font-text">
              Organizujemy turnieje i sparingi w badmintona, oferując zarówno amatorom oraz zaawansowanym graczom szansę
              na rozwój umiejętności i rywalizację w przyjaznej atmosferze. Uczestnicy mają możliwość zmierzenia się z
              wieloma przeciwnikami, co pozwala na wymianę doświadczeń i technik gry. Turnieje są starannie przygotowane
              i dostosowane do różnych poziomów zaawansowania, zapewniając sprawiedliwe i ekscytujące zawody dla każdego
              uczestnika.
              O nadchodzących wydarzeniach informujemy na naszej grupie na WhatsAppie.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>


</template>
<script setup lang="ts">
</script>
