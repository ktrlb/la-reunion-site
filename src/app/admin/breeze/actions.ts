"use server"

import { revalidatePath } from "next/cache"
import { syncBreezeEventsFromApi, syncBreezePeopleSample } from "@/lib/breeze/sync"
import { requireAdmin } from "@/lib/require-admin"

export async function syncEventsAction() {
  await requireAdmin()
  const result = await syncBreezeEventsFromApi()
  revalidatePath("/admin/breeze")
  return result
}

export async function syncPeopleAction() {
  await requireAdmin()
  const result = await syncBreezePeopleSample()
  revalidatePath("/admin/breeze")
  return result
}
