<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { createClient } from "@supabase/supabase-js";

let status = ref({
  sent: false,
  error: "",
});

const submit = async () => {
  const {
    name,
    email,
    phone,
    tournament,
    categories,
    city,
    club,
    shirtSize,
    wantMeal,
  } = selection.value;

  const config = useRuntimeConfig();

  // using public key for that table, allows insert only
  const supabase = createClient(
    config.public.supabaseUrl || "https://joamxhskhinhzqmyhzsu.supabase.co",
    config.public.supabaseKey ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYW14aHNraGluaHpxbXloenN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTkxODgsImV4cCI6MjAyNjg3NTE4OH0.9izeVz6ZZucjWvnWNf1IsztCDOhueBU7WMzWhBbjGiw",
  );

  const { error } = await supabase.from("tournament_registration").insert(
    Object.values(categories).map((selectedCategory, idx) => ({
      email,
      phone,
      city,
      club,
      shirt_size: idx === 0 ? shirtSize : null,
      meal_opt_in: wantMeal,
      event_name: tournament,
      player1: name,
      player2: selectedCategory.partner,
      category: selectedCategory.name,
    })),
  );

  if (error) {
    status.value.error =
      "Nie udało się wysłać formularza, prosimy spróbować ponownie później.";
    status.value.sent = false;
  } else {
    status.value.sent = true;
    status.value.error = "";
  }
};

const selection = ref({
  name: "",
  email: "",
  phone: "",
  tournament: "",
  categories: {} as any,
  wantShirt: false,
  wantMeal: false,
  termsAccepted: false,
  shirtSize: "",
  city: "",
  club: "",
});

const selectedCategories = computed(() => {
  return Object.keys(selection.value.categories);
});

const selectionComplete = computed(() => {
  return (
    selection.value.termsAccepted &&
    selection.value.name &&
    selection.value.email &&
    selection.value.phone &&
    selection.value.tournament &&
    (selection.value.city || selection.value.club) &&
    (selection.value.wantShirt ? selection.value.shirtSize : true) &&
    selectedCategories.value.length > 0 &&
    Object.values(selection.value.categories).reduce((acc, category: any) => {
      return acc && (category.double ? category.partner : true);
    }, true)
  );
});

let shirtSizes = reactive([
  {
    label: "Damska - S",
    name: "WOMAN-S",
  },
  {
    label: "Damska - M",
    name: "WOMAN-M",
  },
  {
    label: "Damska - L",
    name: "WOMAN-L",
  },
  {
    label: "Damska - XL",
    name: "WOMAN-XL",
  },
  {
    label: "Damska - XXL",
    name: "WOMAN-XXL",
  },
  {
    label: "Męska - S",
    name: "MAN-S",
  },
  {
    label: "Męska - M",
    name: "MAN-M",
  },
  {
    label: "Męska - L",
    name: "MAN-L",
  },
  {
    label: "Męska - XL",
    name: "MAN-XL",
  },
  {
    label: "Męska - XXL",
    name: "MAN-XXL",
  },
]);

let tournaments = reactive([
  {
    name: "turniej_mistrzowski",
    label: "Turniej mistrzowski",
    categories: [
      {
        name: "A-SM",
        label: "Gra pojedyncza mężczyzn",
        excludes: ["A-SM-45", "A-SK"],
        double: false,
      },
      {
        name: "A-SM-45",
        label: "Gra pojedyncza mężczyzn 45+ (skończone 45 lat w dniu zawodów)",
        excludes: ["A-SM", "A-SK"],
        double: false,
      },
      {
        name: "A-SK",
        label: "Gra pojedyncza kobiet",
        excludes: ["A-SM", "A-SM-45"],
        double: false,
      },
      {
        name: "A-MX",
        label: "Gra podwójna mieszana (mixt)",
        double: true,
      },
      {
        name: "A-DM",
        label: "Gra podwójna mężczyzn",
        excludes: ["A-DK"],
        double: true,
      },
      {
        name: "A-DK",
        label: "Gra podwójna kobiet",
        excludes: ["A-DM"],
        double: true,
      },
    ],
  },
  {
    name: "turniej_towarzyszacy",
    label: "Turniej towarzyszący",
    categories: [
      {
        name: "B-SM",
        label: "Gra pojedyncza mężczyzn",
        excludes: ["B-SK"],
        double: false,
      },
      {
        name: "B-SM",
        label: "Gra pojedyncza kobiet",
        excludes: ["B-SM"],
        double: false,
      },
      {
        name: "B-DM",
        label: "Gra podwójna mężczyzn",
        excludes: ["B-DK"],
        double: true,
      },
      {
        name: "B-DK",
        label: "Gra podwójna kobiet",
        excludes: ["B-DM"],
        double: true,
      },
      {
        name: "B-MX",
        label: "Gra podwójna mieszana (mixt)",
        double: true,
      },
    ],
  },
]);
</script>

<template>
  <section
    class="shadow-md rounded-2xl bg-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-6">
      <h1 class="text-[2em] font-body">Formularz zgłoszeniowy</h1>
    </div>

    <div
      v-if="status.sent"
      class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-white-100 border border-green-800 shadow"
      role="alert"
    >
      <strong class="font-medium">Gratulacje!</strong> Twoje zgłoszenie zostało
      wysłane
    </div>

    <form v-if="!status.sent" method="dialog" class="">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          <abbr class="text-coral-100">*</abbr>Imię i Nazwisko
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          id="name"
          type="text"
          placeholder="Jan Kowalski"
          @input="selection.name = $event.target.value"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          <abbr class="text-coral-100">*</abbr>Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          id="email"
          type="email"
          placeholder="jan@kowalski.pl"
          @input="selection.email = $event.target.value"
        />
      </div>

      <div class="mb-2">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
          <abbr class="text-coral-100">*</abbr>Telefon
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
          id="phone"
          type="tel"
          placeholder="504 321 421"
          @input="selection.phone = $event.target.value"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
          <abbr class="text-coral-100">*</abbr>Miasto i/lub klub
        </label>
        <div class="flex items-center align-middle">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="city"
            type="text"
            placeholder="Miasto"
            @input="selection.city = $event.target.value"
          />
          &nbsp;/&nbsp;
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="city"
            type="text"
            placeholder="Klub"
            @input="selection.club = $event.target.value"
          />
        </div>
      </div>

      <hr class="border-blue-100 my-6" />

      <div
        class="mb-4"
        v-for="tournament in tournaments"
        :key="tournament.name"
      >
        <div class="mb-2 flex items-center">
          <input
            class=""
            name="tournament"
            type="radio"
            :id="tournament.name"
            @change="
              selection.tournament = tournament.name;
              selection.categories = {};
            "
          />
          <label
            class="block text-gray-700 text-sm font-bold ml-2"
            :for="tournament.name"
          >
            {{ tournament.label }}
          </label>
        </div>

        <section
          v-if="selection.tournament === tournament.name"
          v-for="category in tournament.categories"
          class="ml-6"
        >
          <div class="flex items-center">
            <input
              class=""
              :name="category.name"
              :id="category.name"
              type="checkbox"
              @change="
                $event.target.checked
                  ? (selection.categories[category.name] = category)
                  : delete selection.categories[category.name]
              "
              :disabled="
                (selectedCategories.length >= 3 &&
                  !selection.categories[category.name]) ||
                selectedCategories.some((selectedCategory) =>
                  (category.excludes || []).includes(selectedCategory),
                )
              "
            />
            <label
              class="block text-gray-700 text-sm font-bold ml-2"
              :for="category.name"
            >
              {{ category.label }}
            </label>
          </div>
          <Transition>
            <div
              v-if="selection.categories[category.name] && category.double"
              class="my-2"
            >
              <label
                class="block text-gray-700 text-sm font-bold"
                :for="category.name"
              >
                <abbr class="text-coral-100">*</abbr>Partner
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                :id="category.name"
                type="text"
                placeholder="Imię i nazwisko Partnera"
                @input="
                  selection.categories[category.name].partner =
                    $event.target.value
                "
              />
            </div>
          </Transition>
        </section>
      </div>

      <hr class="border-blue-100 my-6" />

      <section class="additional-info mb-6">
        <div class="flex items-center">
          <input
            class=""
            id="acceptTerms"
            type="checkbox"
            @change="selection.termsAccepted = $event.target.checked"
          />
          <label
            class="block text-gray-700 text-sm font-bold ml-2"
            for="acceptTerms"
          >
            <abbr class="text-coral-100">*</abbr>Oświadczam, że zapoznałem się z
            <a
              class="text-blue-200"
              href="https://pzbad.tournamentsoftware.com/tournament/11D3F3BA-7657-4C28-B449-63728D7BBFFB"
              target="_blank"
              >regulaminem</a
            >
            turnieju
          </label>
        </div>

        <div class="flex items-center">
          <input
            class=""
            id="wantMeal"
            type="checkbox"
            @change="selection.wantMeal = $event.target.checked"
          />
          <label
            class="block text-gray-700 text-sm font-bold ml-2"
            for="wantMeal"
          >
            Wyrażam zainteresowanie zakupem ciepłego posiłku w dniu turnieju
          </label>
        </div>

        <div class="flex items-center">
          <input
            class=""
            id="wantShirt"
            type="checkbox"
            @change="selection.wantShirt = $event.target.checked"
          />
          <label
            class="block text-gray-700 text-sm font-bold ml-2"
            for="wantShirt"
          >
            Chciałbym zakupić okolicznościową koszulkę w cenie 50zł
          </label>
        </div>

        <div class="flex items-center mt-2" v-if="selection.wantShirt">
          <label
            class="block text-gray-700 text-sm font-bold ml-5 mr-2"
            for="shirtSize"
          >
            <abbr class="text-coral-100">*</abbr>Wybierz rozmiar
          </label>
          <select
            id="shirtSize"
            @change="selection.shirtSize = $event.target.value"
          >
            <option value="" disabled selected hidden></option>
            <option v-for="size in shirtSizes" :key="size">
              {{ size.label }}
            </option>
          </select>
        </div>
      </section>

      <div
        v-if="status.error"
        class="p-4 mb-4 text-sm text-red-400 rounded-lg bg-white-100 border border-red-400 shadow"
        role="alert"
      >
        <strong class="font-medium">Błąd!</strong> {{ status.error }}
      </div>
      <div v-if="!status.sent" class="flex justify-end">
        <button
          class="bg-blue-200 disabled:bg-[#999] font-body text-[1em] font-bold rounded-2xl px-16 py-3 text-yellow"
          :disabled="!selectionComplete"
          @click="submit()"
        >
          Wyślij
        </button>
      </div>
      <div class="mt-5 text-right">
        <small>
          Więcej informacji na temat turnieju dostępne na stronie:
          <a
            class="text-blue-200 hover:underline"
            href="https://pzbad.tournamentsoftware.com/tournament/11D3F3BA-7657-4C28-B449-63728D7BBFFB"
            target="_blank"
            >https://pzbad.tournamentsoftware.com</a
          >
        </small>
      </div>
    </form>
  </section>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
