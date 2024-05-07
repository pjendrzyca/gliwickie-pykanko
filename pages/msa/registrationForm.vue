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
    individualReviewRequest,
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
      review_request: individualReviewRequest,
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
  individualReviewRequest: false,
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

      <p class="text-red-600 pt-6">
        Zgłoszenia do mistrzostw zostały zakończone.<br />Lista
        uczestników dostępna na
        <a
            class="cursor-pointer underline text-blue-200"
          href="https://pzbad.tournamentsoftware.com/tournament/11D3F3BA-7657-4C28-B449-63728D7BBFFB"
          >stronie</a
        >
        turnieju.
      </p>
    </div>
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
