"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useMemo } from "react";

export default function FoundersGuides({
  pill,
  title,
  description,
  items = [],
  bgClass = "bg-[#F3E3CF]",
}) {
  return (
    <section className={bgClass}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-3xl">
          {pill ? (
            <div className="inline-flex rounded-full bg-[#D9D2F1] px-5 py-2 text-[11px] font-semibold tracking-wide text-[#2C2C6B]">
              {pill}
            </div>
          ) : null}

          <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {description}
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {items.map((person, idx) => (
            <FounderCard key={person?.slug || person?.name || idx} {...person} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  name,
  roleLabel,
  roleColor = "#E08B64",
  roleTextColor = "#ffffff",
  image,
  imageAlt,
  bio,
  readMoreHref = "/",

  // ✅ new optional
  modal,
}) {
  const hasModal = Boolean(modal);

  return (
    <div className="rounded-[26px] border-2 border-slate-900 bg-white p-6 sm:p-7">
      {/* Image frame */}
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        <img
          src={image}
          alt={imageAlt || name || "Profile photo"}
          className="h-[280px] w-full object-contain p-6 sm:h-[320px]"
          style={{ backgroundColor: "#fff" }}
        />

        {roleLabel ? (
          <div className="absolute bottom-5 left-5 right-5 flex justify-center">
            <span
              className="inline-flex w-full max-w-[280px] justify-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium shadow-sm"
              style={{ backgroundColor: roleColor, color: roleTextColor }}
            >
              {roleLabel}
            </span>
          </div>
        ) : null}
      </div>

      {name ? (
        <h3 className="mt-6 text-xl sm:text-2xl font-medium text-blue-600">
          {name}
        </h3>
      ) : null}

      {bio ? (
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
          {bio}
        </p>
      ) : null}

      <div className="mt-5 flex justify-end">
        {hasModal ? (
          <FounderModalTrigger
            person={{ name, roleLabel, image, imageAlt, bio }}
            modal={modal}
          />
        ) : (
          <a
            href={readMoreHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Read More <span aria-hidden="true">⌄</span>
          </a>
        )}
      </div>
    </div>
  );
}

function FounderModalTrigger({ person, modal }) {
  const title = modal?.title || person?.name || "Details";
  const content = Array.isArray(modal?.content) ? modal.content : [];
  const social = Array.isArray(modal?.social) ? modal.social : [];

  const safeLinks = useMemo(() => {
    return social
      .filter((l) => l?.href)
      .map((l) => ({
        label: l.label || l.href,
        href: l.href,
        external: /^https?:\/\//.test(l.href),
      }));
  }, [social]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Read More <span aria-hidden="true">⌄</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />

        {/* Content */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-7">
            <div>
              <Dialog.Title className="text-lg sm:text-xl font-semibold text-slate-900">
                {title}
              </Dialog.Title>
              {person?.roleLabel ? (
                <div className="mt-1 text-sm text-slate-600">{person.roleLabel}</div>
              ) : null}
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="grid gap-6 px-5 py-5 sm:px-7 sm:py-7 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left */}
            <div className="md:col-span-5">
              {person?.image ? (
                <div className="overflow-hidden rounded-2xl bg-slate-50 border">
                  <img
                    src={person.image}
                    alt={person.imageAlt || person.name || ""}
                    className="h-[320px] w-full object-contain p-6"
                    style={{ backgroundColor: "#fff" }}
                  />
                </div>
              ) : null}

              {safeLinks.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {safeLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noreferrer" : undefined}
                      className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right */}
            <div className="md:col-span-7">
              {person?.name ? (
                <div className="text-xl sm:text-2xl font-semibold text-blue-600">
                  {person.name}
                </div>
              ) : null}

              {person?.bio ? (
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700">
                  {person.bio}
                </p>
              ) : null}

              {content.length ? (
                <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
                  {content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t px-5 py-4 sm:px-7">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}