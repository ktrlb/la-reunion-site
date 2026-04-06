"use server"

import { revalidatePath } from "next/cache"
import {
  syncBreezeEventsFromApi,
  syncBreezePeopleFromTagFolder,
  syncBreezeVolunteerData,
} from "@/lib/breeze/sync"
import { requireAdmin } from "@/lib/require-admin"

export async function syncEventsAction() {
  await requireAdmin()
  const result = await syncBreezeEventsFromApi()
  revalidatePath("/admin/breeze")
  revalidatePath("/admin/breeze/explore")
  return result
}

export async function syncPeopleAction() {
  await requireAdmin()
  const result = await syncBreezePeopleFromTagFolder()
  revalidatePath("/admin/breeze")
  revalidatePath("/admin/breeze/explore")
  return result
}

export async function syncVolunteersAction() {
  await requireAdmin()
  const result = await syncBreezeVolunteerData()
  revalidatePath("/admin/breeze")
  revalidatePath("/admin/breeze/explore")
  return result
}
