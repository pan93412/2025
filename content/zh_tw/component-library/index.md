<script setup lang="ts">
import MenuBarDemo from './MenuBarDemo.vue';
import SessionDateDemo from './SessionDateDemo.vue';
import ButtonPrimaryDemo from './ButtonPrimaryDemo.vue';
import ButtonSecondaryDemo from './ButtonSecondaryDemo.vue';
import IconButtonPrimaryDemo from './IconButtonPrimaryDemo.vue';
import IconButtonBasicDemo from './IconButtonBasicDemo.vue';
import CheckboxDemo from './CheckboxDemo.vue';
import BookmarkedDemo from './BookmarkedDemo.vue';
import CTag from '#/components/CTag.vue';
import CCard from '#/components/CCard.vue';
</script>

# Component Library

## Menu Bar

<MenuBarDemo />

## Session Date

<SessionDateDemo />

## Button

### Primary

<ButtonPrimaryDemo />

### Secondary

<ButtonSecondaryDemo />

### Icon Button / Primary

<IconButtonPrimaryDemo />

### Icon Button / Basic

<IconButtonBasicDemo />

## Checkbox

<CheckboxDemo />

## Icon / Bookmarked

<BookmarkedDemo />

## Tag

<CTag variant="secondary">Tag</CTag>
<CTag variant="primary">Tag</CTag>
<CTag variant="secondary">Tag</CTag>

## Card

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">
<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="actived"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="disabled"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="default"
    bookmarked
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="actived"
    bookmarked
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    status="disabled"
    bookmarked
/>

</div>

## Card with yScale

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 10:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="1"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 11:00"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="2"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    time="10:00 ~ 11:30"
    speaker="zoe steinamp"
    tag="主議程軌"
    :heightFactor="3"
/>

</div>
