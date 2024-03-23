<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { createClient } from "@supabase/supabase-js";


let status = ref({
  sent: false,
  error: "",
});

const submit = async () => {
  const { name, email, phone, tournament, categories } = selection.value;

  const config = useRuntimeConfig();

  // using public key for that table, allows insert only
  const supabase = createClient(
      config.public.supabaseUrl || 'https://joamxhskhinhzqmyhzsu.supabase.co',
      config.public.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYW14aHNraGluaHpxbXloenN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyOTkxODgsImV4cCI6MjAyNjg3NTE4OH0.9izeVz6ZZucjWvnWNf1IsztCDOhueBU7WMzWhBbjGiw',
  );

  const { error } = await supabase
    .from("tournament_registration")
    .insert(
      Object.values(categories).map((selectedCategory) => ({
        email,
        phone,
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
});

const selectedCategories = computed(() => {
  return Object.keys(selection.value.categories);
});

const selectionComplete = computed(() => {
  return (
    selection.value.name &&
    selection.value.email &&
    selection.value.phone &&
    selection.value.tournament &&
    selectedCategories.value.length > 0 &&
    Object.values(selection.value.categories).reduce((acc, category: any) => {
      return acc && (category.double ? category.partner : true);
    }, true)
  );
});

let tournaments = reactive([
  {
    name: "turniej_mistrzowski",
    label: "Turniej mistrzowski",
    categories: [
      {
        name: "A-MX",
        label: "Mixt",
        double: true,
      },
      {
        name: "A-DM",
        label: "Debel Męski",
        excludes: ["A-DK"],
        double: true,
      },
      {
        name: "A-DK",
        label: "Debel Kobiet",
        excludes: ["A-DM"],
        double: true,
      },
      {
        name: "A-SK",
        label: "Singiel Kobiet",
        excludes: ["A-SM", "A-SM-45"],
        double: false,
      },
      {
        name: "A-SM",
        label: "Singiel Mężczyzn",
        excludes: ["A-SM-45", "A-SK"],
        double: false,
      },
      {
        name: "A-SM-45",
        label: "Singiel Mężczyzn 45+",
        excludes: ["A-SM", "A-SK"],
        double: false,
      },
    ],
  },
  {
    name: "turniej_towarzyszacy",
    label: "Turniej towarzyszący",
    categories: [
      {
        name: "B-MX",
        label: "Mixt",
        double: true,
      },
      {
        name: "B-DM",
        label: "Debel Męski",
        excludes: ["B-DK"],
        double: true,
      },
      {
        name: "B-DK",
        label: "Debel Kobiet",
        excludes: ["B-DM"],
        double: true,
      },
      {
        name: "B-SM",
        label: "Singiel Mężczyzn",
        double: false,
      },
    ],
  },
]);
</script>

<template>
  <section
    class="shadow-md rounded-2xl bg-yellow shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <h1 class="text-[2em] font-body mb-6">Formularz zgłoszeniowy</h1>

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

      <div class="mb-4">
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
